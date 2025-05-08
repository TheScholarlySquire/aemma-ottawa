export function formatToGoogleDate(datetime) {
  const date = new Date(datetime);
  return date.toISOString().replace(/[-:]|\.\d{3}/g, '');
}
