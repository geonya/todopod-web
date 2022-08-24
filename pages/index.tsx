import type { GetServerSideProps, NextPage } from 'next'
import ProjectsList, {
  getProjectsQueryVariables,
} from '../components/ProjectsList'
import { addApolloState, initializeApollo } from '../lib/apolloClient'
import { GET_PROJECTS_QUERY } from '../lib/graphql/fragments'

const Home: NextPage = () => {
  return (
    <div>
      <ProjectsList />
    </div>
  )
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
