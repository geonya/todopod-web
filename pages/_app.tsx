import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/server/apolloClient'
import { MantineProvider } from '@mantine/core'
import Head from 'next/head'
import Layout from '../components/Layout'
import { GetServerSideProps } from 'next'
import { JWT_TOKEN } from '../constants'
import { useEffect, useLayoutEffect } from 'react'
import { isLoggedInVar } from '../lib/client/apolloVars'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <>
      <Head>
        <title>Todopod</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'dark',
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
