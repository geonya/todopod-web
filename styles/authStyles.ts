import { createStyles } from '@mantine/core'

export const useAuthStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },
  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: '100vh',
    maxWidth: 500,
    width: '100%',
    paddingTop: 80,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  error: {
    wordBreak: 'break-word',
    color: theme.fn.variant({ variant: 'filled', color: 'red' }).background,
    fontSize: theme.fontSizes.sm,
    lineHeight: 1.2,
    display: 'block',
  },
}))
