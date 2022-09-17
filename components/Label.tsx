import { Box, Text } from '@mantine/core'
import React from 'react'

export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <Box<'label'>
      sx={(theme) => ({
        display: 'inline-block',
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[0]
            : theme.colors.gray[9],
        wordBreak: 'break-word',
        cursor: 'default',
        WebkitTapHighlightColor: 'transparent',
      })}
    >
      {children}
    </Box>
  )
}
