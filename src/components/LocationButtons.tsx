import { Button, Stack } from '@chakra-ui/react';
import { useWeather } from '../contexts/weatherContext';

export default function LocationButtons() {
  const { getWeatherFromCurrentLocation, openSearchModal } = useWeather();
  return (
    <Stack direction="row" justifyContent="space-between" margin={0}>
      <Button
        onClick={() => openSearchModal()}
        variant="solid"
        borderRadius="0"
        background="#6E707A"
        _hover={{
          background: '#55565e',
        }}
        _active={{
          background: '#3d3d43',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      >
        Search for places
      </Button>
      <Button
        onClick={getWeatherFromCurrentLocation}
        variant="solid"
        w="40px"
        h="40px"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        background="#6E707A"
        _hover={{
          background: '#55565e',
        }}
        _active={{
          background: '#3d3d43',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      >
        <span className="material-icons md-18">gps_fixed</span>
      </Button>
    </Stack>
  );
}
