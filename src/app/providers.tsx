"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60, // 1시간
            gcTime: 1000 * 60 * 60 * 24, // 24시간(캐시 보관 시간)
            refetchOnWindowFocus: false, // 탭 전환시 재요청 안함
            refetchOnMount: false, // 컴포넌트 마운트시 재요청 안함
            refetchOnReconnect: false, // 네트워크 재연결시 재요청안함
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
