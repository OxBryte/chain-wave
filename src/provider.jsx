import { OnchainKitProvider } from '@coinbase/onchainkit'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import {  WagmiProvider } from 'wagmi';
 
import { getConfig } from './wagmi.jsx';
import { baseSepolia } from 'wagmi/chains';
 
export function Providers({children, initialState}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  const API_KEY = '' 
 
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider 
          apiKey={API_KEY}
          chain={baseSepolia}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}