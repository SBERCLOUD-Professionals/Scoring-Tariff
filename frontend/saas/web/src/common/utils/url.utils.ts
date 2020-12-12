function isValidUrl(str?: string): boolean {
  try {
    if (!str) return false;
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

export const urlUtils = {isValidUrl};
