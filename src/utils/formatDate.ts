export function formatDate(d: string|Date, locale='en-US') {
  const obj = typeof d === 'string' ? new Date(d) : d;
  return obj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/New_York', // Display time in Eastern Time (New York)
    timeZoneName: 'short', // e.g., "EST" or "EDT"
  });
}
