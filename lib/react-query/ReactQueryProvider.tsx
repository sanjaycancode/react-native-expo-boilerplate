import { ReactNode, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { queryClient } from "@/lib/react-query/queryClient";

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [persistOptions, setPersistOptions] = useState<{
    persister: ReturnType<typeof createAsyncStoragePersister>;
    maxAge: number;
  }>();

  useEffect(() => {
    let isMounted = true;

    async function initializePersistence() {
      try {
        await AsyncStorage.getItem("english-charlie-react-query-cache");

        if (!isMounted) {
          return;
        }

        setPersistOptions({
          persister: createAsyncStoragePersister({
            storage: AsyncStorage,
            key: "english-charlie-react-query-cache",
          }),
          maxAge: 24 * 60 * 60 * 1000,
        });
      } catch (error) {
        console.warn(
          "AsyncStorage is unavailable, continuing without persisted query cache.",
          error,
        );
      }
    }

    initializePersistence();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!persistOptions) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
