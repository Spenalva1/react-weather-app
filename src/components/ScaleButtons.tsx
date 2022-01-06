import { Button, HStack } from '@chakra-ui/react';
import { useWeather } from '../contexts/weatherContext';

export default function ScaleButtons() {
  const { scale, setScale } = useWeather();

  return (
    <HStack justifyContent="flex-end" spacing={4} fontWeight="semibold">
      <Button
        onClick={() => setScale('celsius')}
        variant="solid"
        w="40px"
        h="40px"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={scale === 'celsius' ? 'black' : 'white'}
        background={scale === 'celsius' ? 'white' : '#6E707A'}
        _hover={{
          background: scale === 'celsius' ? 'white' : '#55565e',
        }}
        _active={{
          background: scale === 'celsius' ? 'white' : '#3d3d43',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      >
        ℃
      </Button>
      <Button
        onClick={() => setScale('fahrenheit')}
        variant="solid"
        w="40px"
        h="40px"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color={scale === 'fahrenheit' ? 'black' : 'white'}
        background={scale === 'fahrenheit' ? 'white' : '#6E707A'}
        _hover={{
          background: scale === 'fahrenheit' ? 'white' : '#55565e',
        }}
        _active={{
          background: scale === 'fahrenheit' ? 'white' : '#3d3d43',
        }}
        _focus={{
          boxShadow: 'none',
        }}
      >
        ℉
      </Button>
    </HStack>
  );
}
