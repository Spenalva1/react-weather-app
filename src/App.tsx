import { Box, Center, Container, Image, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import LocationButtons from './components/LocationButtons';
import NextDays from './components/NextDays';
import ScaleButtons from './components/ScaleButtons';
import SearchModal from './components/SearchModal';
import Today from './components/Today';
import TodayHighlights from './components/TodayHighlights';
import { useWeather } from './contexts/weatherContext';
import useWindowResize from './lib/useWindowResize';

function App() {
  const { isSearchModalOpen } = useWeather();
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1400);
  useWindowResize((width) => setIsLarge(width >= 1400));

  return (
    <Center
      height="100%"
      minHeight="100vh"
      userSelect="none"
      background="#1E213A"
      p={2}
    >
      <Container
        maxW={isLarge ? '1400px' : '400px'}
        color="white"
        border="1px solid #100E1D"
        p={0}
        borderRadius="xl"
        overflow="hidden"
      >
        <Stack direction={isLarge ? 'row' : 'column'} spacing={0}>
          <Box
            flex={1}
            background="#1E213A"
            padding="10"
            position="relative"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            gap={10}
          >
            <LocationButtons />
            <Today />
            <Image
              src="images/Cloud-background.png"
              position="absolute"
              top="75px"
              left="-25%"
              w="150%"
              opacity={0.05}
              maxW="1000px"
              zIndex="0"
            />
            {isSearchModalOpen && <SearchModal />}
          </Box>
          <Stack
            flex={2}
            background="#100E1D"
            py="10"
            px={isLarge ? 20 : 5}
            gap={10}
          >
            {isLarge && <ScaleButtons />}
            <NextDays isLarge={isLarge} />
            <TodayHighlights isLarge={isLarge} />
          </Stack>
        </Stack>
      </Container>
    </Center>
  );
}

export default App;
