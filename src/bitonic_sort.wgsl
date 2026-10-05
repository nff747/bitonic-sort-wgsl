struct SortUniforms {
  j: u32,
  k: u32,
  num_elements: u32,
  pad: u32,
}

@group(0) @binding(0) var<storage, read_write> data: array<u32>;
@group(0) @binding(1) var<uniform> uniforms: SortUniforms;

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let i = global_id.x;
  if (i >= uniforms.num_elements) {
    return;
  }

  let ixj = i ^ uniforms.j;

  // The partner index must be greater to avoid redundant double-swaps
  if (ixj > i) {
    let elem_i = data[i];
    let elem_ixj = data[ixj];

    // Ascending stage if (i & k) == 0, else Descending
    let ascending = (i & uniforms.k) == 0u;

    if (ascending) {
      if (elem_i > elem_ixj) {
        data[i] = elem_ixj;
        data[ixj] = elem_i;
      }
    } else {
      if (elem_i < elem_ixj) {
        data[i] = elem_ixj;
        data[ixj] = elem_i;
      }
    }
  }
}
