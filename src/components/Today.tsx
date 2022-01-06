import { HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useWeather } from '../contexts/weatherContext';
import { converToFahrenheit } from '../lib/temperature';

export default function Today() {
  const { today, scale, weather } = useWeather();

  return (
    <VStack
      flex={1}
      justifyContent="space-between"
      backgroundPosition="center"
      objectFit="cover"
      color="#A09FB1"
      zIndex={1}
    >
      {today && (
        <>
          <Image src={`images/${today.weatherState.replace(' ', '')}.png`} />
          <Text fontSize="5xl">
            <Text as="span" fontSize="9xl" color="white">
              {scale === 'celsius'
                ? today.temp.current
                : converToFahrenheit(today.temp.current)}
            </Text>
            {scale === 'celsius' ? '℃' : '℉'}
          </Text>
          <Text fontWeight="semibold" fontSize="4xl">
            {today.weatherState}
          </Text>
          <VStack>
            <Text>
              Today
              <Text mx="4" as="span">
                •
              </Text>
              {today.date}
            </Text>
            <HStack alignItems="center">
              <span className="material-icons">place</span>
              <Text>{weather?.location}</Text>
            </HStack>
          </VStack>
        </>
      )}
    </VStack>
  );
}
