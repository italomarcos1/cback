import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental'

import { Routes } from './routes';
import { AppProvider } from './context/app';

import { ProductModal } from './components/ProductModal';

import { GlobalStyle } from './styles';

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 20, // 24 hours
      },
    },
  })

  const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage })
  
  persistQueryClient({
    queryClient,
    persistor: localStoragePersistor,
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Routes />
        <GlobalStyle />
        <ProductModal />
      </AppProvider>
    </QueryClientProvider>
  );
}
