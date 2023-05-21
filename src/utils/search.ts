// @ts-ignore
import hangulSearch from 'hangul-chosung-search';

// This function prevents flickering of results when searching Korean
export function search(target: string, query: string): boolean {
  return hangulSearch(target, query);
}
