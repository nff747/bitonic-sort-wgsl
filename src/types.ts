/**
 * Types and utility mathematical helpers for Bitonic Sort in WebGPU / WGSL.
 */

export interface SortStageParams {
  j: number;
  k: number;
  numElements: number;
}

export interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

/**
 * Rounds an integer up to the next power of 2.
 */
export function nextPowerOfTwo(n: number): number {
  if (n <= 1) return 1;
  return Math.pow(2, Math.ceil(Math.log2(n)));
}

/**
 * Calculates the total number of bitonic comparator steps required to sort N elements:
 * log2(N) * (log2(N) + 1) / 2
 */
export function calculateBitonicStepCount(n: number): number {
  if (n <= 1) return 0;
  const log2n = Math.round(Math.log2(n));
  return (log2n * (log2n + 1)) / 2;
}
