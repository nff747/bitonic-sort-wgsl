import code from "./bitonic_sort.wgsl";
import { SorterOptions } from "./types.js";
export class BitonicSorter {
  device: any;
  pipeline: any;
  options: SorterOptions;
  constructor(device: any, opts: SorterOptions = {}) { 
    this.device = device;
    this.options = opts;
    this.pipeline = device.createComputePipeline({ compute: { module: device.createShaderModule({code}), entryPoint: "main" } });
  }
  sort(buffer: any, length: number) { 
    // bitonic sort passes
  }
}