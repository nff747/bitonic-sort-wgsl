import { describe, it, expect } from 'vitest';
import { BitonicSorter } from '../src/sorter.js';

describe('BitonicSorter Integration', () => {
  it('instantiates and reports pipeline state', () => {
    const sorter = new BitonicSorter();
    expect(sorter).toBeDefined();
    expect(sorter.pipeline).toBeNull();
  });
});
