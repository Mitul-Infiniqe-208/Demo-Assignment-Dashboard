"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";


const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            placeholderData: (previousData: unknown) => previousData,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
        {children}
        <Toaster closeButton={true} position="top-right" />
    </QueryClientProvider>
  );
};

export default AppProvider;
