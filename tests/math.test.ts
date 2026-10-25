import { expect, test, describe, it } from "vitest";
import { nextPowerOfTwo, calculateBitonicStepCount } from "../src/types";

describe("Bitonic Math Utilities", () => {
  it("computes next power of 2 correctly for boundary cases", () => {
    expect(nextPowerOfTwo(1)).toBe(1);
    expect(nextPowerOfTwo(2)).toBe(2);
    expect(nextPowerOfTwo(3)).toBe(4);
    expect(nextPowerOfTwo(5)).toBe(8);
    expect(nextPowerOfTwo(1000)).toBe(1024);
    expect(nextPowerOfTwo(1024)).toBe(1024);
  });

  it("calculates exact bitonic comparison passes: log2(N)*(log2(N)+1)/2", () => {
    // For N = 2: 1 pass
    expect(calculateBitonicStepCount(2)).toBe(1);
    // For N = 4: 2 * 3 / 2 = 3 passes
    expect(calculateBitonicStepCount(4)).toBe(3);
    // For N = 8: 3 * 4 / 2 = 6 passes
    expect(calculateBitonicStepCount(8)).toBe(6);
    // For N = 1024: 10 * 11 / 2 = 55 passes
    expect(calculateBitonicStepCount(1024)).toBe(55);
  });
});
