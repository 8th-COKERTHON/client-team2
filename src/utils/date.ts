export function formatDateToSlash(dateString: string): string {
  return dateString.slice(0, 10).replaceAll("-", "/");
}
