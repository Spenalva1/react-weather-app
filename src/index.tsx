import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { WeatherProvider } from './contexts/weatherContext';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
