import { AppShell, Container } from '@mantine/core'
import Head from 'next/head'
import React from 'react'
import metaData from '../data/metaData'
import useIsDark from '../hooks/useIsDark'
import NavbarSearch from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const isDark = useIsDark()
  return (
    <AppShell
      navbar={<NavbarSearch />}
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
