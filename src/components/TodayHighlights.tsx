import { Box, Grid, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useWeather } from '../contexts/weatherContext';

interface TodayHighlightsProps {
  isLarge: boolean;
}

export default function TodayHighlights({ isLarge }: TodayHighlightsProps) {
  const { today } = useWeather();

  if (!today) return <Box />;

  return (
    <Box>
      <Text fontWeight="bold" fontSize="2xl" mb={4}>
        Today's Highlights
      </Text>
      <Grid
        templateColumns={isLarge ? '1fr 1fr' : '1fr'}
        templateRows="1fr 1fr"
        gap={6}
      >
        <VStack background="#1E213A" py={6}>
          <Text>Wind status</Text>
          <Text fontSize="4xl">
            <Text as="span" fontWeight="bold" fontSize="6xl">
              {today?.wind.speed}
            </Text>
            mph
          </Text>
          <HStack>
            <Box
              w="30px"
              h="30px"
              borderRadius="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              background="#6E707A"
            >
              <Image
                transform={`scale(0.8) rotate(${
                  today?.wind.direction || 0
                }deg)`}
                color="white"
                src="images/navigation.svg"
              />
            </Box>
            <Text as="span">{today?.wind.directionCompass}</Text>
          </HStack>
        </VStack>
        <VStack background="#1E213A" py={6}>
          <Text>Humidity</Text>
          <Text fontSize="4xl">
            <Text as="span" fontWeight="bold" fontSize="6xl">
              {today?.humidity}
            </Text>
            %
          </Text>
          <Box w="250px">
            <HStack
              fontWeight="bold"
              fontSize="sm"
              color="#A09FB1"
              justifyContent="space-between"
            >
              <Text>0</Text>
              <Text>50</Text>
              <Text>100</Text>
            </HStack>
            <Box
              h="`8px`"
              width="100%"
              background="#E7E7EB"
              borderRadius="2xl"
              overflow="hidden"
            >
              <Box
                h="8px"
                width={`${today?.humidity || 0}%`}
                background="#FFEC65"
              />
            </Box>
            <HStack
              fontWeight="bold"
              fontSize="sm"
              color="#A09FB1"
              justifyContent="flex-end"
            >
              <Text>%</Text>
            </HStack>
          </Box>
        </VStack>
        <VStack background="#1E213A" py={6}>
          <Text>Visibility</Text>
          <Text fontSize="4xl">
            <Text as="span" fontWeight="bold" fontSize="6xl">
              {today?.visibility}
            </Text>
            miles
          </Text>
        </VStack>
        <VStack background="#1E213A" py={6}>
          <Text>Air Pressure</Text>
          <Text fontSize="4xl">
            <Text as="span" fontWeight="bold" fontSize="6xl">
              {today?.airPressure}
            </Text>
            mb
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
}
