const WEATHER_LOCATIONS_SEARCHED_KEY = 'weather-locations-searched';

export function getSearchedLocations(): string[] {
  const items = localStorage.getItem(WEATHER_LOCATIONS_SEARCHED_KEY);
  return items ? (JSON.parse(items) as string[]) : [];
}

export function saveSearchedLocation(location: string) {
  let searchedLocations = getSearchedLocations();

  if (
    searchedLocations.some((searchedLocation) => searchedLocation === location)
  )
    return;

  searchedLocations.unshift(location);

  if (searchedLocations.length > 6) {
    searchedLocations = searchedLocations.slice(0, 6);
  }

  localStorage.setItem(
    WEATHER_LOCATIONS_SEARCHED_KEY,
    JSON.stringify(searchedLocations)
  );
}
