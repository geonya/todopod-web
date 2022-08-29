import { NetworkStatus } from '@apollo/client'
import {
  Badge,
  Button,
  ButtonProps,
  Center,
  Code,
  createStyles,
  Group,
  Switch,
  SwitchProps,
  Text,
  Title,
} from '@mantine/core'
import { useGetProjectsQuery } from '../lib/graphql/__generated__'
import { NextLink } from '@mantine/next'

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
    </section>
  )
}
