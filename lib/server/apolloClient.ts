import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { APOLLO_STATE_PROP_NAME } from '../../constants'
import merge from 'deepmerge'
import { isEqual } from 'lodash'
import { useMemo } from 'react'
import { onError } from '@apollo/client/link/error'
import { NextPageContext } from 'next'
import { createUploadLink } from 'apollo-upload-client'

let apolloClient: ApolloClient<NormalizedCacheObject>

const isBrowser = typeof window !== 'undefined'

function createApolloClient(ctx: NextPageContext | null) {
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: { headers: any }) => {
      return {
        headers: {
          ...headers,
        },
      }
    })
    return forward(operation)
  })
  const uploadHttpLink = createUploadLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? ''
        : 'http://localhost:4000/graphql',
    credentials: 'include',
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

  const additiveLink = from([authLink, errorLink, uploadHttpLink])

  return new ApolloClient({
    ssrMode: !isBrowser,
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
    apolloClient ?? createApolloClient(initialState)
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

  if (!isBrowser) return _apolloClient
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
