import { Provider as JotaiProvider, createStore } from 'jotai'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import LoginForm from '@/components/login/login-form'
import { LoginContainer, Main } from '@/styles/index-styles'

export default function Home() {
  const queryClient = new QueryClient()
  const store = createStore()
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="gen by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider store={store}>
          <Main>
            <LoginContainer>
              <LoginForm />
            </LoginContainer>
          </Main>
        </JotaiProvider>
      </QueryClientProvider>
    </>
  )
}
