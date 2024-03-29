import { createStyles, Text } from '@mantine/core'
import useIsDark from '../hooks/useIsDark'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { IconGripVertical } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { Task, useGetTasksLazyQuery } from '../lib/graphql/__generated__'
import Loading from './Loading'

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      useIsDark() ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md,
    backgroundColor: useIsDark() ? theme.colors.dark[5] : theme.white,
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
    color: useIsDark() ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}))

interface TaskLiskProps {
  projectId?: number
}
interface ITask {
  name: string
}

export default function TaskLisk({ projectId }: TaskLiskProps) {
  const { classes, cx } = useStyles()

  const [state, handler] = useListState<ITask>([])

  const [getTasks, { data, loading, error }] = useGetTasksLazyQuery({
    onCompleted: (data) => {
      if (!data.getTasks.ok || !data.getTasks.tasks) return
      handler.setState(data.getTasks.tasks)
    },
  })
  useEffect(() => {
    getTasks({
      variables: {
        input: {
          projectId: projectId!,
        },
      },
    })
  }, [projectId, getTasks, data])

  const items = state.map((item, i) => (
    <Draggable key={item.name + i} index={i} draggableId={item.name + i}>
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
          <Text>{item.name}</Text>
        </div>
      )}
    </Draggable>
  ))

  if (loading) return <Loading />

  return (
    <>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handler.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <Droppable droppableId='task-list' direction='vertical'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
