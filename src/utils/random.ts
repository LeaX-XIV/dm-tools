export function uniform(min: number, max: number): number {
  // XXX: Max is excluded
  return Math.random() * (max - min) + min;
}
