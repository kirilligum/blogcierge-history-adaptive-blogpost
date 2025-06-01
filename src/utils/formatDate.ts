export function formatDate(d: string|Date, locale='en-US') {
  const obj = typeof d === 'string' ? new Date(d) : d;
  return obj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC', // Display time in UTC
    timeZoneName: 'short', // e.g., "UTC"
  });
}
