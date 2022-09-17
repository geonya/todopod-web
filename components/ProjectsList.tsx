import { makeVar, NetworkStatus, useReactiveVar } from '@apollo/client'
import {
  Center,
  Grid,
  Loader,
  Modal,
  Pagination,
  Stack,
  UnstyledButton,
} from '@mantine/core'
import { IconPencil } from '@tabler/icons'
import { useState } from 'react'
import { useGetProjectsQuery } from '../lib/graphql/__generated__'
import CraeteProject from './CreateProject'
import Loading from './Loading'
import Project from './Project'

export const createProjectModalOpenedVar = makeVar(false)

export default function ProjectsList() {
  const [activePage, setPage] = useState(1)
  const opened = useReactiveVar(createProjectModalOpenedVar)
  const { loading, error, data } = useGetProjectsQuery({
    variables: {
      input: {
        page: activePage,
      },
    },
  })

  const projects = data?.getProjects.projects

  if (error) return <div>ERROR : {error.message}</div>
  if (loading) return <Loading />

  return (
    <Stack>
      <Grid>
        {projects?.map((project, i) => (
          <Grid.Col xs={6} sm={4} md={3} lg={3} xl={2} key={i}>
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
      <Pagination
        total={data?.getProjects.totalPages || 1}
        sx={{ width: '100%' }}
        position='center'
        page={activePage}
        onChange={(page) => {
          setPage(page)
        }}
        boundaries={3}
        initialPage={5}
      />
      <UnstyledButton
        sx={(theme) => ({
          position: 'fixed',
          right: 20,
          bottom: 50,
          backgroundColor: theme.colors.blue[6],
          color: theme.white,
          borderRadius: '50%',
          padding: 10,
          ':hover': {
            opacity: 0.5,
          },
        })}
        onClick={() => createProjectModalOpenedVar(true)}
      >
        <IconPencil size={45} />
      </UnstyledButton>
      <Modal
        centered
        opened={opened}
        onClose={() => createProjectModalOpenedVar(false)}
        title='프로젝트 만들기'
      >
        <CraeteProject />
      </Modal>
    </Stack>
  )
}
