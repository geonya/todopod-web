import { createStyles } from '@mantine/core'

export const useAuthStyles = createStyles(
  (theme, { opened }: { opened?: boolean }) => ({
    wrapper: {
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },
    form: {
      borderRight: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
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
    rolesControl: {
      width: 200,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 15px',
      borderRadius: theme.radius.md,
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[2]
      }`,
      transition: 'background-color 150ms ease',
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[opened ? 5 : 6]
          : opened
          ? theme.colors.gray[0]
          : theme.white,
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },
    },
    label: {
      fontWeight: 500,
      fontSize: theme.fontSizes.sm,
    },
    icon: {
      transition: 'transform 150ms ease',
      transform: opened ? 'rotate(180deg)' : 'rotate(0deg',
    },
  }),
)
