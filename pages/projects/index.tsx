import { makeVar, useReactiveVar } from '@apollo/client'
import { Modal, Pagination, Text } from '@mantine/core'
import { useState } from 'react'
import CraeteProject from '../../components/CreateProject'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import ProjectsList from '../../components/ProjectsList'
import WriteButton from '../../components/WriteButton'
import { useGetProjectsQuery } from '../../lib/graphql/__generated__'

export const createProjectModalOpenedVar = makeVar(false)

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
  const writeButtonOnClick = () => {
    createProjectModalOpenedVar(true)
  }
  if (loading || !data) return <Loading />

  if (data.getProjects.projects && data.getProjects.projects.length === 0) {
    return (
      <Layout centered>
        <Text>새로운 프로젝트 만들기</Text>
      </Layout>
    )
  }

  return (
    <Layout>
      <ProjectsList projects={data.getProjects.projects} />
      <WriteButton actionFn={writeButtonOnClick} />
      {data.getProjects.totalPages && data.getProjects.totalPages <= 10 ? (
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
      <Modal
        centered
        opened={opened}
        onClose={() => createProjectModalOpenedVar(false)}
        title='프로젝트 만들기'
      >
        <CraeteProject />
      </Modal>
    </Layout>
  )
}
