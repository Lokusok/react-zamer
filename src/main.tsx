import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import workerService from './worker-service';

console.log(workerService);

import App from './app';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
