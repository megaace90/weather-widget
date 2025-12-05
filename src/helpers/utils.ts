export const debounce = <Args extends unknown[]>(
	fn: (...args: Args) => void,
  delay: number,
): ((...args: Args) => void) => {
	let timerID: ReturnType<typeof setTimeout> | undefined
	return (...args: Args): void => {
		if (timerID) {
			clearTimeout(timerID)
		}
		timerID = setTimeout(() => fn(...args), delay)
	}
}

export const degToCompass = (deg: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
	if (!deg || !directions[index]) {
		return directions[0]!;
	}
  return directions[index];
}

export const windSpeedToBeaufort = (speed: number) => {
  const beaufortScale = [
    { max: 0.2, description: 'Calm' },
    { max: 1.5, description: 'Light Air' },
    { max: 3.3, description: 'Light Breeze' },
    { max: 5.4, description: 'Gentle Breeze' },
    { max: 7.9, description: 'Moderate Breeze' },
    { max: 10.7, description: 'Fresh Breeze' },
    { max: 13.8, description: 'Strong Breeze' },
    { max: 17.1, description: 'Near Gale' },
    { max: 20.7, description: 'Gale' },
    { max: 24.4, description: 'Severe Gale' },
    { max: 28.4, description: 'Strong Storm' },
    { max: 32.6, description: 'Violent Storm' },
    { max: Infinity, description: 'Hurricane' }
  ];

  for (const level of beaufortScale) {
    if (speed <= level.max) {
      return level.description;
    }
  }

  return '';
}