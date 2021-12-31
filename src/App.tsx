import React, { useEffect, useState } from 'react';
import { getLocationWeather } from './api';
import { Weather } from './types';

function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<'celsius' | 'Fahrenheit'>('celsius');

  const getWeather = async (queryType: 'query' | 'lattlong', query: string) => {
    const result = await getLocationWeather(queryType, query);
    console.log(result);

    if (result) {
      setWeather(result);
    } else {
      setError('Error getting weather location.');
    }
  };

  const getWeatherFromCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude, longitude },
          } = position;
          getWeather('lattlong', `${latitude},${longitude}`);
        },
        (geoError) => {
          console.error(geoError);
        }
      );
    }
  };

  useEffect(() => {
    getWeatherFromCurrentLocation();
    // getWeather();
  }, []);

  return <div className="App">hola</div>;
}

export default App;
