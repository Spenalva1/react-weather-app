import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: '"Raleway", sans-serif',
      },
    },
  },
});

export default theme;
