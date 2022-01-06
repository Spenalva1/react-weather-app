import { Box, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useWeather } from '../contexts/weatherContext';
import { getSearchedLocations } from '../lib/searchedLocations';

export default function SearchedLocations() {
  const [searchedLocations] = useState<string[]>(() => getSearchedLocations());
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
    <VStack>
      {!!searchedLocations.length &&
        searchedLocations.map((location) => (
          <Box
            as="button"
            key={location}
            onClick={() => onSearchLocationClick(location)}
          >
            {location}
          </Box>
        ))}
    </VStack>
  );
}
