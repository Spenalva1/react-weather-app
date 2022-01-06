export function converToFahrenheit(magnitude: number): number {
  return Math.round(magnitude * 1.8 + 32);
}

export function formatTemperature(
  scale: 'celsius' | 'fahrenheit',
  magnitude: number
): string {
  if (scale === 'celsius') return `${magnitude}℃`;
  return `${converToFahrenheit(magnitude)}℉`;
}
