import { ChevronRightIcon } from '@chakra-ui/icons';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useWeather } from '../contexts/weatherContext';
import { getSearchedLocations } from '../lib/searchedLocations';

export default function SearchedLocations() {
  const [searchedLocations] = useState<string[]>(() => getSearchedLocations());
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const { getWeather, closeSearchModal } = useWeather();

  const onSearchLocationClick = async (location: string) => {
    try {
      await getWeather('query', location);
      closeSearchModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack>
      {!!searchedLocations.length &&
        searchedLocations.map((location, i) => (
          <HStack
            as="button"
            key={location}
            onClick={() => onSearchLocationClick(location)}
            onMouseEnter={() => setHoveredLocation(i)}
            onMouseLeave={() => setHoveredLocation(null)}
            w="100%"
            justifyContent="space-between"
            boxSizing="content-box"
            border="1px solid transparent"
            _hover={{
              borderColor: '#616475',
            }}
            px={3}
            py={4}
            spacing={2}
          >
            <Text>{location}</Text>
            {hoveredLocation === i && <ChevronRightIcon color="gray" />}
          </HStack>
        ))}
    </Stack>
  );
}
