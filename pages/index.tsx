import type { GetServerSideProps, NextPage } from 'next'
import { getProjectsQueryVariables } from '../components/ProjectsList'
import { addApolloState, initializeApollo } from '../lib/server/apolloClient'
import { GET_PROJECTS_QUERY } from '../lib/graphql/schema'

const Home: NextPage = () => {
  return <div>This is Home!</div>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: GET_PROJECTS_QUERY,
    variables: getProjectsQueryVariables,
  })
  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Home
