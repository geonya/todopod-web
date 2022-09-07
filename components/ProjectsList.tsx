import { NetworkStatus } from '@apollo/client'
import { Container, Grid, UnstyledButton } from '@mantine/core'
import { IconPencil } from '@tabler/icons'
import useIsDark from '../hooks/useIsDark'

import { useGetProjectsQuery } from '../lib/graphql/__generated__'
import Layout from './Layout'
import Project from './Project'

export default function ProjectsList() {
  const isDark = useIsDark()
  const { loading, error, data, fetchMore, networkStatus } =
    useGetProjectsQuery({
      variables: {
        input: {
          page: 1,
        },
      },
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
    <Layout title='Projects'>
      <Grid>
        {projects?.map((project, i) => (
          <Grid.Col span={3} key={i}>
            <Project
              id={project.id}
              image={
                'https://img.freepik.com/free-photo/businessmen-businesswomen-meeting-brainstorming-ideas_7861-3065.jpg?w=996&t=st=1662533026~exp=1662533626~hmac=f8234c09f36abf7e2901466d036e3f3af30b62248d2c1036b5b04ca58b079c36'
              }
              title={project.title}
              description={project.description || ''}
              tags={['tag', 'test', 'todopod']}
            />
          </Grid.Col>
        ))}
      </Grid>
      <UnstyledButton
        sx={(theme) => ({
          position: 'fixed',
          right: 20,
          bottom: 50,
          backgroundColor: isDark ? theme.colors.blue[5] : theme.colors.blue[8],
          color: isDark ? theme.white : theme.black,
          borderRadius: '50%',
          padding: 5,
        })}
      >
        <IconPencil size={60} />
      </UnstyledButton>
    </Layout>
  )
}
