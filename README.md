# bitonic-sort-wgsl

High-performance parallel bitonic sort in WebGPU WGSL.

## Usage
```ts
import { BitonicSorter } from "bitonic-sort-wgsl";
const sorter = new BitonicSorter(device);
sorter.sort(myBuffer, 1024);
```