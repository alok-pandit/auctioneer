'use client'

import { Provider as JotaiProvider, createStore } from 'jotai'
import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5000
          }
        }
      })
  )
  const jotaiStore = createStore()
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={jotaiStore}>
        {children}
        {process.env.NODE_ENV !== 'production' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </JotaiProvider>
    </QueryClientProvider>
  )
}
