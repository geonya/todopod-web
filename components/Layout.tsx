import { AppShell } from '@mantine/core'
import React from 'react'
import useIsDark from '../hooks/useIsDark'
import { isLoggedInVar } from '../lib/client/apolloVars'
import NavbarSearch from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const isDark = useIsDark()
  return (
    <AppShell
      navbar={isLoggedInVar() ? <NavbarSearch /> : undefined}
      sx={(theme) => ({
        main: {
          backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  )
}
