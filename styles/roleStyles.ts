import { createStyles } from '@mantine/core'

interface UseRoleStylesProps {
  menuOpened: boolean
}

export const useRoleStyles = createStyles(
  (theme, { menuOpened }: UseRoleStylesProps) => ({
    rolesControl: {
      width: '100%',
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
          ? theme.colors.dark[menuOpened ? 5 : 6]
          : menuOpened
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
      transform: menuOpened ? 'rotate(180deg)' : 'rotate(0deg',
    },
  }),
)
