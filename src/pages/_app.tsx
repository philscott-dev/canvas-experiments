import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../graphql/apollo/apolloClient'
import Head from 'next/head'
import { getYear } from 'date-fns'
import { ThemeProvider } from '@emotion/react'
import { theme } from 'theme'
import { AppProps } from 'next/app'
import 'styles/fonts.css'
import 'styles/default.css'

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <>
      <Head>
        <title>Canvas Experiments</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="Copyright"
          content={`Copyright © Phil Scott ${getYear(
            new Date(),
          )}. All Rights Reserved.`}
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default App
