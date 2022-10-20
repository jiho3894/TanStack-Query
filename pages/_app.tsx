import type { AppProps } from "next/app";
import { global } from "../styles/global";
import { Global } from "@emotion/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { useLoading } from "../hooks/useLoading";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      cacheTime: 1000 * 60 * 60 * 24 * 7,
    },
  },
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [query] = useState(() => queryClient);
  const loading = useLoading();
  return (
    <QueryClientProvider client={query}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Global styles={global} />
        {loading ? <span>Loading...</span> : <Component {...pageProps} />}
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
