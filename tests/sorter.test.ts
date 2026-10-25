import { describe, it, expect } from 'vitest';
import { BitonicSorter } from '../src/sorter.js';

describe('BitonicSorter Engine', () => {
  const sorter = new BitonicSorter();

  it('correctly sorts reverse-ordered power of 2 array', () => {
    const input = new Uint32Array([8, 7, 6, 5, 4, 3, 2, 1]);
    const sorted = sorter.cpuSort(input);
    expect(Array.from(sorted)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('correctly sorts random array of 16 elements', () => {
    const input = new Uint32Array([15, 3, 9, 1, 12, 6, 8, 2, 14, 4, 11, 7, 13, 5, 10, 0]);
    const sorted = sorter.cpuSort(input);
    expect(Array.from(sorted)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it('handles array with duplicate numbers', () => {
    const input = new Uint32Array([4, 2, 4, 1, 2, 3, 1, 4]);
    const sorted = sorter.cpuSort(input);
    expect(Array.from(sorted)).toEqual([1, 1, 2, 2, 3, 4, 4, 4]);
  });

  it('throws error for non-power-of-2 length', () => {
    const input = new Uint32Array([3, 1, 2]);
    expect(() => sorter.cpuSort(input)).toThrow(/power of 2/);
  });

  it('pads arbitrary arrays up to power of 2 with sentinel values', () => {
    const input = new Uint32Array([10, 5, 20]); // length 3 -> pads to 4
    const res = BitonicSorter.padToPowerOfTwo(input, 999);
    expect(res.originalLength).toBe(3);
    expect(res.padded.length).toBe(4);
    expect(res.padded[0]).toBe(10);
    expect(res.padded[1]).toBe(5);
    expect(res.padded[2]).toBe(20);
    expect(res.padded[3]).toBe(999);

    const sortedPadded = sorter.cpuSort(res.padded);
    expect(Array.from(sortedPadded)).toEqual([5, 10, 20, 999]);
  });
});
