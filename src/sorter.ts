export interface SorterOptions {
  workgroupSize?: number;
}

export class BitonicSorter {
  device: any;
  pipeline: any = null;
  uniformBuffer: any = null;
  bindGroupLayout: any = null;

  constructor(device?: any, options: SorterOptions = {}) {
    this.device = device;
  }

  async init(shaderCode: string) {
    if (!this.device) return;

    const module = this.device.createShaderModule({ code: shaderCode });
    this.pipeline = this.device.createComputePipeline({
      layout: 'auto',
      compute: { module, entryPoint: 'main' }
    });

    this.uniformBuffer = this.device.createBuffer({
      size: 16,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
  }

  // Pure CPU bitonic sort simulation
  cpuSort(array: Uint32Array): Uint32Array {
    const n = array.length;
    // Check power of 2
    if ((n & (n - 1)) !== 0) {
      throw new Error(`Length must be a power of 2, received ${n}`);
    }

    const out = new Uint32Array(array);

    for (let k = 2; k <= n; k <<= 1) {
      for (let j = k >> 1; j > 0; j >>= 1) {
        for (let i = 0; i < n; i++) {
          const ixj = i ^ j;
          if (ixj > i) {
            const ascending = (i & k) === 0;
            if (ascending) {
              if (out[i] > out[ixj]) {
                const tmp = out[i];
                out[i] = out[ixj];
                out[ixj] = tmp;
              }
            } else {
              if (out[i] < out[ixj]) {
                const tmp = out[i];
                out[i] = out[ixj];
                out[ixj] = tmp;
              }
            }
          }
        }
      }
    }
    return out;
  }

  // Dispatches WebGPU command encoder passes across all bitonic stages
  async sortGPU(buffer: any, numElements: number): Promise<void> {
    if (!this.device || !this.pipeline) {
      throw new Error("WebGPU pipeline not initialized");
    }
    if ((numElements & (numElements - 1)) !== 0) {
      throw new Error(`numElements must be power of 2, got ${numElements}`);
    }

    const commandEncoder = this.device.createCommandEncoder();
    const workgroups = Math.ceil(numElements / 256);

    for (let k = 2; k <= numElements; k <<= 1) {
      for (let j = k >> 1; j > 0; j >>= 1) {
        // Write uniform parameters: j, k, numElements
        this.device.queue.writeBuffer(
          this.uniformBuffer,
          0,
          new Uint32Array([j, k, numElements, 0])
        );

        const bindGroup = this.device.createBindGroup({
          layout: this.pipeline.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: { buffer } },
            { binding: 1, resource: { buffer: this.uniformBuffer } }
          ]
        });

        const pass = commandEncoder.beginComputePass();
        pass.setPipeline(this.pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.dispatchWorkgroups(workgroups);
        pass.end();
      }
    }

    this.device.queue.submit([commandEncoder.finish()]);
  }
}
