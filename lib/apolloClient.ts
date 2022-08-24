import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  makeVar,
  ApolloError,
  NormalizedCacheObject,
} from '@apollo/client'
import { APOLLO_STATE_PROP_NAME, LOCALSTORAGE_TOKEN } from '../constants'
import merge from 'deepmerge'
import { isEqual } from 'lodash'
import { useMemo } from 'react'
import { onError } from '@apollo/client/link/error'

let apolloClient: ApolloClient<NormalizedCacheObject>

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => ({
    headers: { ...headers },
  }))
  return forward(operation)
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const additiveLink = from([errorLink, httpLink])

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: additiveLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {},
        },
      },
    }),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient: ApolloClient<NormalizedCacheObject> =
    apolloClient ?? createApolloClient()
  if (initialState) {
    const existingCache = _apolloClient.extract()
    const data = merge(existingCache, initialState, {
      arrayMerge: (destinationArray: any, sourceArray: any) => [
        ...sourceArray,
        ...destinationArray.filter((d: any) =>
          sourceArray.every((s: any) => !isEqual(d, s)),
        ),
      ],
    })
    _apolloClient.cache.restore(data)
  }

  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any,
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }
  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
