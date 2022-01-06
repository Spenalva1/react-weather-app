import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getLocationWeather } from '../api';
import { getCurrentGeolocation } from '../lib/geolocation';
import { saveSearchedLocation } from '../lib/searchedLocations';
import { Weather, WeatherDay } from '../types';

interface IWeatherContext {
  weather: Weather | null;
  today: WeatherDay | undefined;
  nextDays: WeatherDay[] | undefined;
  scale: 'celsius' | 'fahrenheit';
  setScale: (scale: 'celsius' | 'fahrenheit') => void;
  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  getWeather: (queryType: 'query' | 'lattlong', query: string) => Promise<void>;
  getWeatherFromCurrentLocation: () => void;
}

const LocalStateContext = createContext<IWeatherContext>({} as IWeatherContext);
const LocalStateProvider = LocalStateContext.Provider;

const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [scale, setScale] = useState<'celsius' | 'fahrenheit'>('celsius');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const today = useMemo(() => weather?.days[0], [weather]);
  const nextDays = useMemo(() => weather?.days.slice(1), [weather]);

  useEffect(() => {
    if (!weather?.location) return;
    saveSearchedLocation(weather.location);
  }, [weather]);

  const getWeather = useCallback(
    async (queryType: 'query' | 'lattlong', query: string) => {
      const result = await getLocationWeather(queryType, query);
      if (result) {
        setWeather(result);
      } else {
        console.error('Error getting weather location.');
        throw new Error('Error getting weather location.');
      }
    },
    []
  );

  const getWeatherFromCurrentLocation = useCallback(async () => {
    try {
      const { latitude, longitude } = await getCurrentGeolocation();
      getWeather('lattlong', `${latitude},${longitude}`);
    } catch (CurrentCoordserror) {
      console.error(CurrentCoordserror);
    }
  }, [getWeather]);

  const openSearchModal = useCallback(() => {
    setIsSearchModalOpen(true);
  }, []);

  const closeSearchModal = useCallback(() => {
    setIsSearchModalOpen(false);
  }, []);

  useEffect(() => {
    getWeatherFromCurrentLocation();
  }, [getWeatherFromCurrentLocation]);

  return (
    <LocalStateProvider
      value={{
        weather,
        scale,
        setScale,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        today,
        nextDays,
        getWeather,
        getWeatherFromCurrentLocation,
      }}
    >
      {children}
    </LocalStateProvider>
  );
};

const useWeather = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { WeatherProvider, useWeather };
