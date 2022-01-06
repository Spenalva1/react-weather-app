export interface WeatherDay {
  airPressure: number;
  date: string;
  visibility: number;
  humidity: number;
  wind: {
    direction: number;
    directionCompass: string;
    speed: number;
  };
  temp: {
    current: number;
    max: number;
    min: number;
  };
  weatherState: string;
}

export interface Weather {
  location: string;
  days: WeatherDay[];
}
