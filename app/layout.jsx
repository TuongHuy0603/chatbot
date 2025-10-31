'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import '@/app/globals.css';
import '@/styles/theme-variables.css';
import '@/components/DarkTheme.css';

export default function RootLayout({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 60s
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}


