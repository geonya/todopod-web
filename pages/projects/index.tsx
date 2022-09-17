import { useReactiveVar } from '@apollo/client'
import { Button, Modal, Pagination } from '@mantine/core'
import { useState } from 'react'
import CraeteProject from '../../components/CreateProject'
import CreateProjectModal from '../../components/CreateProjectModal'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import ProjectsList from '../../components/ProjectsList'
import WriteButton from '../../components/WriteButton'
import { createProjectModalOpenedVar } from '../../lib/client/apolloVars'
import { useGetProjectsQuery } from '../../lib/graphql/__generated__'

export default function Projects() {
  const [activePage, setPage] = useState(1)
  const opened = useReactiveVar(createProjectModalOpenedVar)
  const { loading, data } = useGetProjectsQuery({
    variables: {
      input: {
        page: activePage,
      },
    },
  })
  const openFn = () => {
    createProjectModalOpenedVar(true)
  }
  const closeFn = () => {
    createProjectModalOpenedVar(false)
  }
  if (loading || !data) return <Loading />

  if (data.getProjects.projects && data.getProjects.projects.length === 0) {
    return (
      <Layout centered>
        <Button onClick={openFn}>새로운 프로젝트 만들기</Button>
        <CreateProjectModal opened={opened} closeFn={closeFn} />
      </Layout>
    )
  }

  return (
    <Layout>
      <ProjectsList projects={data.getProjects.projects} />
      <WriteButton actionFn={openFn} />
      {data.getProjects.totalPages && data.getProjects.totalPages > 10 ? (
        <Pagination
          total={data.getProjects.totalPages || 1}
          sx={{ width: '100%' }}
          position='center'
          page={activePage}
          onChange={(page) => {
            setPage(page)
          }}
          boundaries={3}
          initialPage={5}
        />
      ) : null}
      <CreateProjectModal opened={opened} closeFn={closeFn} />
    </Layout>
  )
}
