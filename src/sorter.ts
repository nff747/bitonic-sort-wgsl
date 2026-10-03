import code from "./bitonic_sort.wgsl";
export class BitonicSorter {
  device: any;
  pipeline: any;
  constructor(device: any) { 
    this.device = device;
    this.pipeline = device.createComputePipeline({ compute: { module: device.createShaderModule({code}), entryPoint: "main" } });
  }
}