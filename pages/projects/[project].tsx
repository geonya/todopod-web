import { Button, Loader, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import TaskLisk from '../../components/TaskList'
import {
  useCreateTaskMutation,
  useGetProjectLazyQuery,
} from '../../lib/graphql/__generated__'

export default function ProjectPage() {
  const router = useRouter()
  const [getProject, { data, loading, error }] = useGetProjectLazyQuery({
    variables: {
      input: {
        id: +router.query.project!,
      },
    },
  })
  const taskListData = data?.getProject.project?.tasks?.map((task) => ({
    name: task.name,
  }))
  const [
    createTask,
    { data: TaskData, loading: TaskLoading, error: TaskError },
  ] = useCreateTaskMutation()
  console.log(TaskData)
  const createTaskFn = (projectId: number) => {
    createTask({
      variables: {
        input: {
          name: 'test',
          projectId,
        },
      },
    })
  }

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
        <Loader />
      </Layout>
    )
  }
  if (!data.getProject.ok) {
    return (
      <Layout>
        <Text>{data.getProject.error}</Text>
      </Layout>
    )
  }

  return (
    <Layout title={data.getProject.project?.title}>
      {data.getProject.project?.title}
      <TaskLisk data={taskListData} />
      <Button
        onClick={() =>
          router.query.project ? createTaskFn(+router.query.project) : null
        }
      >
        Add Task
      </Button>
    </Layout>
  )
}
