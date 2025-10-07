export function toUnit(celsius: number, unit: 'metric' | 'imperial') {
  if (unit === 'metric') return { value: celsius, symbol: 'C' };
  return { value: (celsius * 9/5) + 32, symbol: 'F' };
}