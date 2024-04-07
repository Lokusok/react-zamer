import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './app';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from './styles/theme';
import { StoreProvider } from './store';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <StoreProvider>
        <App />
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);
