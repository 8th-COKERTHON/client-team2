export function createReminderDateTime(
  reminderDate: string,
  reminderTime: string,
): string {
  return `${reminderDate}T${reminderTime}:00`;
}
