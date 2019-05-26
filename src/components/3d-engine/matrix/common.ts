const RADS_CONVERT = Math.PI / 180; // descoped to reduce computation

export function radians(degrees: number): number {
  return degrees * RADS_CONVERT; // converts to rads
}
