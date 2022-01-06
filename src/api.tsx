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
    applicable_date: string;
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

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatDate(date: string): string {
  const dateArray = date.split('');
  const newDate = new Date(
    `${dateArray.slice(5).join('')}-${dateArray.slice(0, 4).join('')}`
  );
  const dayName = days[newDate.getDay()];
  const dayNumber = Number(dateArray.slice(8).join(''));
  const monthName = months[newDate.getMonth()];
  return `${dayName}, ${dayNumber} ${monthName}`;
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

async function getMockLocation(): Promise<Location> {
  return Promise.resolve({
    consolidated_weather: [
      {
        id: 6038423178575872,
        weather_state_name: 'Light Rain',
        weather_state_abbr: 'lr',
        wind_direction_compass: 'N',
        created: '2022-01-01T13:25:22.060524Z',
        applicable_date: '2022-01-01',
        min_temp: 23.310000000000002,
        max_temp: 30.675,
        the_temp: 29.325,
        wind_speed: 7.812722309705983,
        wind_direction: 357.25550363832485,
        air_pressure: 1004.5,
        humidity: 60,
        visibility: 9.464104628966833,
        predictability: 75,
      },
      {
        id: 4728870604374016,
        weather_state_name: 'Showers',
        weather_state_abbr: 's',
        wind_direction_compass: 'ENE',
        created: '2022-01-01T13:25:24.878708Z',
        applicable_date: '2022-01-02',
        min_temp: 21.79,
        max_temp: 31.755,
        the_temp: 29.59,
        wind_speed: 8.53814304421114,
        wind_direction: 65.715089767106,
        air_pressure: 1004.5,
        humidity: 58,
        visibility: 14.540085898353615,
        predictability: 73,
      },
      {
        id: 5272286073454592,
        weather_state_name: 'Heavy Cloud',
        weather_state_abbr: 'hc',
        wind_direction_compass: 'E',
        created: '2022-01-01T13:25:27.839015Z',
        applicable_date: '2022-01-03',
        min_temp: 21.795,
        max_temp: 31.35,
        the_temp: 30.605,
        wind_speed: 6.437445981640553,
        wind_direction: 100.97793604417252,
        air_pressure: 1008,
        humidity: 59,
        visibility: 15.317731945438638,
        predictability: 71,
      },
      {
        id: 4657991497285632,
        weather_state_name: 'Showers',
        weather_state_abbr: 's',
        wind_direction_compass: 'SSE',
        created: '2022-01-01T13:25:30.962743Z',
        applicable_date: '2022-01-04',
        min_temp: 22.310000000000002,
        max_temp: 31.974999999999998,
        the_temp: 31.46,
        wind_speed: 8.689634638696678,
        wind_direction: 148.8839882125976,
        air_pressure: 1004.5,
        humidity: 56,
        visibility: 14.527658474508868,
        predictability: 73,
      },
      {
        id: 6171252424179712,
        weather_state_name: 'Light Cloud',
        weather_state_abbr: 'lc',
        wind_direction_compass: 'ESE',
        created: '2022-01-01T13:25:34.120931Z',
        applicable_date: '2022-01-05',
        min_temp: 17.725,
        max_temp: 25.17,
        the_temp: 25.395,
        wind_speed: 11.003119736570428,
        wind_direction: 120.8253943667432,
        air_pressure: 1014.5,
        humidity: 48,
        visibility: 15.662592957130359,
        predictability: 70,
      },
      {
        id: 6379718124240896,
        weather_state_name: 'Heavy Cloud',
        weather_state_abbr: 'hc',
        wind_direction_compass: 'E',
        created: '2022-01-01T13:25:37.141777Z',
        applicable_date: '2022-01-06',
        min_temp: 19.545,
        max_temp: 26.799999999999997,
        the_temp: 23.69,
        wind_speed: 9.674132068718682,
        wind_direction: 99.5,
        air_pressure: 1016,
        humidity: 55,
        visibility: 9.999726596675416,
        predictability: 71,
      },
    ],
    time: '2022-01-01T11:48:43.585310-03:00',
    sun_rise: '2022-01-01T05:44:17.086639-03:00',
    sun_set: '2022-01-01T20:09:47.917487-03:00',
    timezone_name: 'LMT',
    parent: {
      title: 'Argentina',
      location_type: 'Country',
      woeid: 23424747,
      latt_long: '-37.09,-63.58',
    },
    sources: [
      {
        title: 'BBC',
        slug: 'bbc',
        url: 'http://www.bbc.co.uk/weather/',
        crawl_rate: 360,
      },
      {
        title: 'Forecast.io',
        slug: 'forecast-io',
        url: 'http://forecast.io/',
        crawl_rate: 480,
      },
      {
        title: 'HAMweather',
        slug: 'hamweather',
        url: 'http://www.hamweather.com/',
        crawl_rate: 360,
      },
      {
        title: 'Met Office',
        slug: 'met-office',
        url: 'http://www.metoffice.gov.uk/',
        crawl_rate: 180,
      },
      {
        title: 'OpenWeatherMap',
        slug: 'openweathermap',
        url: 'http://openweathermap.org/',
        crawl_rate: 360,
      },
      {
        title: 'Weather Underground',
        slug: 'wunderground',
        url: 'https://www.wunderground.com/?apiref=fc30dc3cd224e19b',
        crawl_rate: 720,
      },
      {
        title: 'World Weather Online',
        slug: 'world-weather-online',
        url: 'http://www.worldweatheronline.com/',
        crawl_rate: 360,
      },
    ],
    title: 'Buenos Aires',
    location_type: 'City',
    woeid: 468739,
    latt_long: '-34.608521,-58.373539',
    timezone: 'America/Argentina/Buenos_Aires',
  });
}

export async function getLocationWeather(
  queryType: 'query' | 'lattlong',
  query: string
): Promise<Weather | null> {
  const locationId = await searchLocation(queryType, query);
  if (!locationId) return null;
  const location = await getLocation(locationId);
  // const location = await getMockLocation();
  return {
    location: location.title,
    days: location.consolidated_weather.map(
      (day): WeatherDay => ({
        airPressure: Math.round(day.air_pressure),
        date: formatDate(day.applicable_date),
        visibility: +day.visibility.toFixed(1),
        humidity: Math.round(day.humidity),
        wind: {
          direction: day.wind_direction,
          directionCompass: day.wind_direction_compass,
          speed: Math.round(day.wind_speed),
        },
        temp: {
          current: Math.round(day.the_temp),
          max: Math.round(day.max_temp),
          min: Math.round(day.min_temp),
        },
        weatherState: day.weather_state_name,
      })
    ),
  };
}
