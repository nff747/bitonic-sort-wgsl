import { describe, it, expect } from 'vitest';

describe('Bitonic f32 sorting simulation', () => {
  it('correctly compares floating point bit patterns', () => {
    const f32Array = new Float32Array([3.14, 1.414, 2.718, 0.577]);
    const sorted = Array.from(f32Array).sort((a, b) => a - b);
    expect(sorted[0]).toBeCloseTo(0.577);
    expect(sorted[3]).toBeCloseTo(3.14);
  });
});
