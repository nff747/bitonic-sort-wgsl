# bitonic-sort-wgsl

High-performance parallel bitonic sort in WebGPU WGSL.

## Architecture
Uses a compute shader with `workgroup_size(256)` and multi-pass dispatch.