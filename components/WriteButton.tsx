import { UnstyledButton } from '@mantine/core'
import { IconPencil } from '@tabler/icons'

interface WriteButtonProps {
  actionFn: () => void
}

export default function WriteButton({ actionFn }: WriteButtonProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        position: 'fixed',
        right: 20,
        bottom: 50,
        backgroundColor: theme.colors.blue[6],
        color: theme.white,
        borderRadius: '50%',
        padding: 10,
        ':hover': {
          opacity: 0.5,
        },
      })}
      onClick={actionFn}
    >
      <IconPencil size={45} />
    </UnstyledButton>
  )
}
