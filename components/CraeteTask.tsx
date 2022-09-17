import { gql } from '@apollo/client'
import { Button, createStyles, Select, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useCreateTaskMutation } from '../lib/graphql/__generated__'
import { createTaskModalOpenedVar } from '../pages/projects/[project]'

interface CreateTaskFormValues {
  name: string
  description?: string
  tagNames?: string[]
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },
  input: {
    height: 'auto',
    paddingTop: 18,
  },
  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}))

interface CreateProjectProps {
  projectId: number
}

export default function CraeteTask({ projectId }: CreateProjectProps) {
  const { classes } = useStyles()
  const taskForm = useForm<CreateTaskFormValues>({
    initialValues: {
      name: '',
      description: '',
    },
    validate: {
      name: (value) => {
        if (value.length < 2) {
          return '2글자 이상 입력해주세요'
        }
        return null
      },
    },
  })

  const [createTask] = useCreateTaskMutation({
    onCompleted: (data) => {
      if (!data.createTask.ok) return
      createTaskModalOpenedVar(false)
    },
    update(cache, { data }) {
      if (!data?.createTask.ok) return
      cache.modify({
        fields: {
          getTasks(existingItems) {
            const newTaskRef = cache.writeFragment({
              fragment: gql`
                fragment NewTask on Task {
                  id
                  name
                  description
                }
              `,
              data: {
                __typename: 'Task',
                id: Date.now(),
                name: taskForm.values.name,
                description: taskForm.values.description,
              },
            })
            const newTasks = [newTaskRef, ...existingItems.tasks]
            console.log(newTasks)
            return { ...existingItems, tasks: newTasks }
          },
        },
      })
    },
  })
  return (
    <form>
      <TextInput
        {...taskForm.getInputProps('name')}
        label='이름'
        placeholder='Task Name'
        classNames={classes}
      />
      <TextInput
        style={{ marginTop: 20 }}
        {...taskForm.getInputProps('description')}
        label='설명'
        placeholder='project description'
        classNames={classes}
      />
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={['geony', 'bora', 'happy']}
        label='태그'
        classNames={classes}
      />
      <DatePicker
        style={{ marginTop: 20 }}
        label='마감 기한'
        placeholder='When will you leave'
        classNames={classes}
        clearable={false}
      />
      <Button
        radius='md'
        style={{ marginTop: 20, width: '100%' }}
        onClick={() =>
          createTask({
            variables: {
              input: {
                name: taskForm.values.name,
                projectId,
                description: taskForm.values.description,
                tagsName: taskForm.values.tagNames,
              },
            },
          })
        }
      >
        업무 생성
      </Button>
    </form>
  )
}
