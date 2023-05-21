export function getErrorMessage(e: unknown) {
  if (e instanceof Error) {
    return e.message;
  } else {
    return 'Unknown error';
  }
}
