struct Params { j: u32, k: u32 }
@group(0) @binding(0) var<storage, read_write> data: array<u32>;
@group(0) @binding(1) var<uniform> params: Params;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let i = global_id.x;
  let ixj = i ^ params.j;
  if (ixj > i) {
    if ((i & params.k) == 0 && data[i] > data[ixj]) { let tmp = data[i]; data[i] = data[ixj]; data[ixj] = tmp; }
    if ((i & params.k) != 0 && data[i] < data[ixj]) { let tmp = data[i]; data[i] = data[ixj]; data[ixj] = tmp; }
  }
}