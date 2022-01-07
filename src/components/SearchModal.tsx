import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useWeather } from '../contexts/weatherContext';
import SearchedLocations from './SearchedLocations';
import SearchForm from './SearchForm';

export default function SearchModal() {
  const [finishOpen, setFinishOpen] = useState<boolean>(false);
  const { closeSearchModal } = useWeather();

  useEffect(() => {
    setTimeout(() => setFinishOpen(true), 10);
  }, []);

  return (
    <Box
      m={0}
      position="absolute"
      top="0"
      left={finishOpen ? '0' : '-100%'}
      transition="linear .2s"
      w="100%"
      h="100%"
      py="5"
      px="12"
      display="flex"
      flexDirection="column"
      gap="30px"
      background="#111322"
      zIndex={2}
    >
      <Box
        as="button"
        w="fit-content"
        ml="auto"
        onClick={() => closeSearchModal()}
      >
        <CloseIcon />
      </Box>
      <SearchForm />
      <SearchedLocations />
    </Box>
  );
}
