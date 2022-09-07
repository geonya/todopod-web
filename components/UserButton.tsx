import {
  Avatar,
  createStyles,
  Group,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import React from 'react'
import useIsDark from '../hooks/useIsDark'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing.md,
    color: useIsDark() ? theme.colors.dark[0] : theme.colors.black,
    '&:hover': {
      backgroundColor: useIsDark()
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    },
  },
}))

interface UserButtonProps extends UnstyledButtonProps {
  image: string
  name: string
  email: string
  icon?: React.ReactNode
}
export default function UserButton({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps) {
  const { classes } = useStyles()
  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={image} radius='xl' />
        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {name}
          </Text>
          <Text color='dimmed' size='xs'>
            {email}
          </Text>
        </div>
        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  )
}
