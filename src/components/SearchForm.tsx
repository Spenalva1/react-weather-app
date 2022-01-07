import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { SyntheticEvent, useRef, useState } from 'react';
import { useWeather } from '../contexts/weatherContext';

export default function SearchForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');
  const { closeSearchModal, getWeather } = useWeather();
  const searchInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const query = searchInputRef?.current?.value;
    if (!query?.length) return;
    setIsLoading(true);
    try {
      await getWeather('query', searchInputRef.current.value);
      closeSearchModal();
    } catch (weatherError) {
      console.error(error);
      setError('Location weather cannot be found.');
      setIsLoading(false);
      searchInputRef.current.value = '';
    }
  };

  return (
    <Box>
      <HStack as="form" onSubmit={onSubmit}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            ref={searchInputRef}
            borderRadius={0}
            type="tel"
            placeholder="search location"
          />
        </InputGroup>
        <Button
          isLoading={isLoading}
          colorScheme="blue"
          borderRadius={0}
          background="#3C47E9"
          _hover={{
            background: '#1825D8',
          }}
          _active={{
            background: '#131DAA',
          }}
          type="submit"
        >
          Search
        </Button>
      </HStack>
      {!!error?.length && !isLoading && (
        <Text mt="2" color="red">
          {error}
        </Text>
      )}
    </Box>
  );
}
