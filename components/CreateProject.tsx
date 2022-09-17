import { gql } from '@apollo/client'
import { Button, createStyles, Select, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { createProjectModalOpenedVar } from '../lib/client/apolloVars'
import { useCreateProjectMutation } from '../lib/graphql/__generated__'

interface CreateProjectFormValues {
  title: string
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

export default function CraeteProject() {
  const { classes } = useStyles()
  const form = useForm<CreateProjectFormValues>({
    initialValues: {
      title: '',
      description: '',
    },
    validate: {
      title: (value) => {
        if (value.length < 2) {
          return '2글자 이상 입력해주세요'
        }
        return null
      },
    },
  })

  const [createProject] = useCreateProjectMutation({
    onCompleted: (data) => {
      if (data.createProject.ok) {
        createProjectModalOpenedVar(false)
      }
    },
    update(cache, { data }) {
      if (!data?.createProject.ok) return
      cache.modify({
        fields: {
          getProjects(existingItems) {
            const newProjectRef = cache.writeFragment({
              fragment: gql`
                fragment NewProject on Project {
                  id
                  title
                  description
                }
              `,
              data: {
                __typename: 'Project',
                id: existingItems.projects.length + 1,
                title: form.values.title,
                description: form.values.description,
              },
            })
            const newProjects = [newProjectRef, ...existingItems.projects]
            return { ...existingItems, projects: newProjects }
          },
        },
      })
    },
  })
  return (
    <form>
      <TextInput
        {...form.getInputProps('title')}
        label='제목'
        placeholder='project title'
        classNames={classes}
      />
      <TextInput
        style={{ marginTop: 20 }}
        {...form.getInputProps('description')}
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
          createProject({
            variables: {
              input: {
                title: form.values.title,
              },
            },
          })
        }
      >
        프로젝트 생성
      </Button>
    </form>
  )
}
