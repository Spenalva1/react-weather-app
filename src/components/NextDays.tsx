import { Box, Grid, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useWeather } from '../contexts/weatherContext';
import { formatTemperature } from '../lib/temperature';

interface NextDaysProps {
  isLarge: boolean;
}

export default function NextDays({ isLarge }: NextDaysProps) {
  const { nextDays, scale } = useWeather();
  return (
    <Grid
      templateColumns={isLarge ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)'}
      justifyContent="center"
      gap={6}
    >
      {nextDays &&
        nextDays.map((day, i) => (
          <VStack key={day.date} background="#1E213A" p="4">
            <Text>{i === 0 ? 'Tomorrow' : day.date}</Text>
            <Box w="60px" h="80px">
              <Image
                w="100%"
                src={`images/${day.weatherState.replace(' ', '')}.png`}
              />
            </Box>
            <HStack justifyContent="space-between" w="100%">
              <Text>{formatTemperature(scale, day.temp.max)}</Text>{' '}
              <Text color="#A09FB1">
                {formatTemperature(scale, day.temp.min)}
              </Text>
            </HStack>
          </VStack>
        ))}
    </Grid>
  );
}
