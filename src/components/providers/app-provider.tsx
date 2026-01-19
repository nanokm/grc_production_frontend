"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState, type ReactNode } from "react"

interface AppProviderProps {
  children: ReactNode
}

/**
 * Application-wide provider that wraps React Query.
 * Provides data fetching and caching capabilities across the application.
 */
export const AppProvider = ({ children }: AppProviderProps): React.ReactElement => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
