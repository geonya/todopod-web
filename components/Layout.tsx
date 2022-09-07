import { AppShell } from '@mantine/core'
import Head from 'next/head'
import React from 'react'
import metaData from '../data/metaData'
import useIsDark from '../hooks/useIsDark'
import NavbarSearch from './Navbar'

export default function Layout({
  children,
  title = 'Page',
}: {
  children: React.ReactNode
  title?: string
}) {
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
      <Head>
        <title>
          {title} | {metaData.siteTitle}
        </title>
      </Head>
      {children}
    </AppShell>
  )
}
