import { Button, Loader, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import TaskLisk from '../../components/TaskList'
import { useGetProjectLazyQuery } from '../../lib/graphql/__generated__'

export default function ProjectPage() {
  const router = useRouter()
  const [getProject, { data, loading, error }] = useGetProjectLazyQuery()

  useEffect(() => {
    if (router.query.project) {
      getProject({
        variables: {
          input: {
            id: +router.query.project,
          },
        },
      })
    }
  }, [router, getProject])

  if (!data || loading) {
    return (
      <Layout>
        Loading
        <Loader />
      </Layout>
    )
  }
  if (!data.getProject.ok || data.getProject.error) {
    return (
      <Layout>
        Error
        <Text>{data.getProject.error}</Text>
      </Layout>
    )
  }

  return (
    <Layout title={data.getProject.project?.title}>
      <Title>{data.getProject.project?.title}</Title>
      <TaskLisk projectId={+router.query.project!} />
    </Layout>
  )
}
