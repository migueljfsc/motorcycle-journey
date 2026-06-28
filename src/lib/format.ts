export function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function fmtKm(n: number): string {
  return `${n.toLocaleString('en-GB')} km`;
}
