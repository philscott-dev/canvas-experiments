import { useMemo } from 'react'
import cache from './cache'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloLink,
  HttpLink,
  split,
} from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = () => {
  // check if rendered on client or on server
  const ssrMode = typeof window === 'undefined'

  // httpLink or http + ws link
  let link

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
      // do something with Error Modal
    }
  })

  // establish the connection to the service
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
    credentials: 'same-origin',
  })

  // assign httpLink first
  link = httpLink

  // once not in SSR, split http and ws traffic
  if (!ssrMode) {
    const wsLink = new WebSocketLink({
      uri: 'ws://localhost:4000/graphql',
      options: {
        reconnect: true,
      },
    })

    link = split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      httpLink,
    )
  }

  // Configured Apollo Client
  return new ApolloClient({
    connectToDevTools: true || process.env.NODE_ENV !== 'production',
    ssrMode,
    cache,
    link: errorLink.concat(link),
  })
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    const existingCache = _apolloClient.extract()
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState?: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
