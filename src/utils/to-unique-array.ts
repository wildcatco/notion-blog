export function toUniqueArray<U>(array: U[]) {
  return [...new Set(array)];
}
