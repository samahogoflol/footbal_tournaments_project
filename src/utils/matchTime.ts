export function parseMatchKickoff(date: string, time: string): number {
  return new Date(`${date}T${time}:00+03:00`).getTime();
}

export function formatMatchDateShort(date: string): string {
  const [, month, day] = date.split('-');
  return `${day}.${month}`;
}
