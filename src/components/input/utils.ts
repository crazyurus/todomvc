export function sanitize(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    // eslint-disable-next-line quotes
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  const reg = /[&<>"'/]/gi;
  return text.replace(reg, match => map[match]);
}

export function hasValidMinimum(value: string, minimum: number): boolean {
  return value.length >= minimum;
}
