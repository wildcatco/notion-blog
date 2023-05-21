export function isTouchDevice() {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.maxTouchPoints > 0
  );
}
