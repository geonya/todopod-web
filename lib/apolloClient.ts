import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  makeVar,
  NormalizedCacheObject,
} from '@apollo/client'
import { APOLLO_STATE_PROP_NAME, LOCALSTORAGE_TOKEN } from '../constants'
import merge from 'deepmerge'
import { isEqual } from 'lodash'
import { useMemo } from 'react'

const token = localStorage.getItem(LOCALSTORAGE_TOKEN)
export const isLoggedInVar = makeVar(Boolean(token))
export const authTokenVar = makeVar(token)

let apolloClient: ApolloClient<NormalizedCacheObject>

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: any }) => ({
    headers: { 'jwt-token': authTokenVar() || '', ...headers },
  }))
  return forward(operation)
})
const additiveLink = from([authLink, httpLink])

function createApolloClient() {
  return new ApolloClient({
    link: additiveLink,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            isLoggedIn: {
              read() {
                return isLoggedInVar()
              },
            },
            token: {
              read() {
                return authTokenVar()
              },
            },
          },
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
}
