import { NetworkStatus } from '@apollo/client'
import { useGetProjectsQuery } from '../lib/graphql/__generated__'

export const getProjectsQueryVariables = {
  getProjectsInput: { page: 1 },
}

export default function ProjectsList() {
  const { loading, error, data, fetchMore, networkStatus } =
    useGetProjectsQuery({
      variables: getProjectsQueryVariables,
    })
  const loadingMoreProjects = networkStatus === NetworkStatus.fetchMore
  const projects = data?.getProjects.projects
  const loadMoreProjects = () => {
    fetchMore({
      variables: {
        skip: projects?.length,
      },
    })
  }
  if (error) return <div>ERROR : {error.message}</div>
  if (loading && !loadingMoreProjects) return <div>Loading...</div>

  return (
    <section>
      <ul>
        {projects?.map((project, i) => (
          <li key={i}>
            <span>{project.title}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => loadMoreProjects()} disabled={loadingMoreProjects}>
        {loadingMoreProjects ? 'Loading...' : 'Show More'}
      </button>
    </section>
  )
}
