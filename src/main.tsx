import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

// configure react query caching behavior
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // stories stay in cache for 24 hrs
      staleTime: 1000 * 60, // data is considered fresh for 1 min
    },
  },
});

// wrapped localstorage in an async interface
// to use with react query persistence utilities
const asyncLocalStorage = {
  getItem: async (key: string) => window.localStorage.getItem(key),
  setItem: async (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    window.localStorage.removeItem(key);
  },
};

// persist fetched query data so previously loaded pages
// remain available after browser refresh
const localStoragePersister = createAsyncStoragePersister({
  storage: asyncLocalStorage,
  key: "hn-query-cache",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* PersistQueryClientProvider restores cached query data on app start up */}
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <App />
    </PersistQueryClientProvider>
  </StrictMode>,
);
