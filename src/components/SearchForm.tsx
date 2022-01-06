import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SyntheticEvent, useRef, useState } from 'react';
import { useWeather } from '../contexts/weatherContext';

export default function SearchForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      searchInputRef.current.value = '';
    }
  };

  return (
    <HStack as="form" mt={10} onSubmit={onSubmit}>
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
  );
}
