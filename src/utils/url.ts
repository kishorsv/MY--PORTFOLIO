/**
 * Validates whether a given string is a valid, well-formed external HTTP/HTTPS URL.
 */
export function isValidExternalUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed === '#' ||
    trimmed === '/' ||
    trimmed.toLowerCase().startsWith('javascript:')
  ) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      Boolean(parsed.hostname && parsed.hostname.includes('.'))
    );
  } catch {
    return false;
  }
}
