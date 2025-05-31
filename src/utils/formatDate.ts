export function formatDate(d: string|Date, locale='en-US') {
  const obj = typeof d === 'string' ? new Date(d) : d;
  return obj.toLocaleDateString(locale, { year:'numeric', month:'long', day:'numeric' });
}
