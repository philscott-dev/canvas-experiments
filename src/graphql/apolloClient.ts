import { useMemo } from 'react'
import link from './link'
import cache from './cache'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = () => {
  return new ApolloClient({
    connectToDevTools: true || process.env.NODE_ENV !== 'production',
    ssrMode: typeof window === 'undefined',
    link,
    cache,
  })
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
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
