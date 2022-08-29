import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
    width: '100%',
    height: '100vh',
    flexDirection: 'column',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 300,
    width: '100%',
  },
}))
