import { Button, createStyles, Select, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
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

export default function CreateTask() {
  const { classes } = useStyles()
  const form = useForm()
  const [
    createTask,
    { data: taskData, loading: TaskLoading, error: TaskError },
  ] = useCreateTaskMutation()

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

  return (
    <form>
      <TextInput
        {...form.getInputProps('title')}
        label='title'
        placeholder='project title'
        classNames={classes}
      />
      <TextInput
        style={{ marginTop: 20 }}
        {...form.getInputProps('description')}
        label='description'
        placeholder='project description'
        classNames={classes}
      />
      <Select
        style={{ marginTop: 20, zIndex: 2 }}
        data={['geony', 'bora', 'happy']}
        label='This is Select'
        classNames={classes}
      />

      <Button
        radius='md'
        style={{ flex: 1, marginTop: 20 }}
        onClick={() =>
          createProject({
            variables: {
              input: {
                title: form.values.title,
              },
            },
          })
        }
      >
        프로젝트 만들기
      </Button>
    </form>
  )
}
