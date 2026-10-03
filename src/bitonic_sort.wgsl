@group(0) @binding(0) var<storage, read_write> data: array<u32>;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
}