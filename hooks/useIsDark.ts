import { useMantineTheme } from '@mantine/core'

export default function useIsDark() {
  const theme = useMantineTheme()
  return theme.colorScheme === 'dark'
}
