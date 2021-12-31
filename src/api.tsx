import axios from 'axios';
import { Weather, WeatherDay } from './types';

const BASE_URL =
  'https://sleepy-river-95810.herokuapp.com/https://www.metaweather.com/api';

interface LocationSearch {
  latt_long: string;
  location_type: string;
  title: string;
  woeid: number;
}

interface Location {
  title: string;
  consolidated_weather: {
    air_pressure: number;
    applicable_date: number;
    visibility: number;
    humidity: number;
    wind_direction: number;
    wind_direction_compass: string;
    wind_speed: number;
    the_temp: number;
    max_temp: number;
    min_temp: number;
    weather_state_name: string;
  }[];
}

async function searchLocation(
  queryType: 'query' | 'lattlong',
  query: string
): Promise<number> {
  const response = await axios.get<LocationSearch[]>(
    `${BASE_URL}/location/search/`,
    {
      params: {
        [queryType]: query,
      },
    }
  );
  return response.data[0]?.woeid;
}

async function getLocation(woeid: number): Promise<Location> {
  const response = await axios.get<Location>(`${BASE_URL}/location/${woeid}/`);
  return response.data;
}

export async function getLocationWeather(
  queryType: 'query' | 'lattlong',
  query: string
): Promise<Weather | null> {
  const locationId = await searchLocation(queryType, query);
  if (!locationId) return null;
  const location = await getLocation(locationId);
  return {
    location: location.title,
    days: location.consolidated_weather.map(
      (day): WeatherDay => ({
        airPressure: day.air_pressure,
        date: day.applicable_date,
        visibility: day.visibility,
        humidity: day.humidity,
        wind: {
          direction: day.wind_direction,
          directionCompass: day.wind_direction_compass,
          speed: day.wind_speed,
        },
        temp: {
          current: day.the_temp,
          max: day.max_temp,
          min: day.min_temp,
        },
        weatherState: day.weather_state_name,
      })
    ),
  };
}
