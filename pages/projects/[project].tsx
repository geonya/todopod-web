import { makeVar, useReactiveVar } from '@apollo/client'
import {
  createStyles,
  Grid,
  Modal,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { IconGripVertical } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import CraeteTask from '../../components/CraeteTask'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import TaskLisk from '../../components/TaskList'
import WriteButton from '../../components/WriteButton'
import { useGetProjectLazyQuery } from '../../lib/graphql/__generated__'

export const createTaskModalOpenedVar = makeVar(false)

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.md,
  },
  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}))

interface ITask {
  id: number
  name: string
  description?: string | null
}

export default function ProjectPage() {
  const router = useRouter()
  const opened = useReactiveVar(createTaskModalOpenedVar)
  const [state, handler] = useListState<ITask>([])

  const [getProject, { data, loading }] = useGetProjectLazyQuery({
    onCompleted(data) {
      if (!data.getProject.project?.tasks) return
      handler.setState(data.getProject.project.tasks)
    },
  })
  const writeButtonOnClick = () => {
    createTaskModalOpenedVar(true)
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

  const [scrolled, setScrolled] = useState(false)
  const { classes, cx } = useStyles()
  const readyRows = state.map((task, i) => (
    <Draggable key={task.id} index={i} draggableId={task.name + i + 'x'}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          {task.name}
        </div>
      )}
    </Draggable>
  ))
  const doingRows = [{ name: 'hi', id: 123 }].map((task, i) => (
    <Draggable key={task.id} index={i} draggableId={task.name + i + 'y'}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          {task.name}
        </div>
      )}
    </Draggable>
  ))
  const doneRows = [{ name: 'hi', id: 123 }].map((task, i) => (
    <Draggable key={task.id} index={i} draggableId={task.name + i + 'z'}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size={18} stroke={1.5} />
          </div>
          {task.name}
        </div>
      )}
    </Draggable>
  ))

  if (!data || loading) {
    return <Loading />
  }

  return (
    <Layout>
      <Title>{data.getProject.project?.title}</Title>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handler.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <Grid>
          <Grid.Col span={4}>
            <Text align='center'>Ready</Text>
            <Droppable droppableId='readyTaskList' direction='vertical'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {readyRows}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text align='center'>Doing</Text>
            <Droppable droppableId='doingTaskList' direction='vertical'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {doingRows}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text align='center'>Done</Text>
            <Droppable droppableId='doneTaskList' direction='vertical'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {doneRows}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid.Col>
        </Grid>
      </DragDropContext>
      <WriteButton actionFn={writeButtonOnClick} />
      <Modal
        centered
        opened={opened}
        onClose={() => createTaskModalOpenedVar(false)}
        title='프로젝트 만들기'
      >
        {router.query.project && (
          <CraeteTask projectId={+router.query.project} />
        )}
      </Modal>
    </Layout>
  )
}
