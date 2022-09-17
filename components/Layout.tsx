import {
  AppShell,
  Box,
  Burger,
  Center,
  Group,
  Header,
  Navbar,
  Notification,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'
import useIsDark from '../hooks/useIsDark'
import { useGetMyProfileQuery } from '../lib/graphql/__generated__'
import AppTitle from './AppTitle'
import EmailVerifiedNoti from './EmailVerifiedNoti'
import NavbarSearch from './Navbar'

interface LayoutProps {
  children: React.ReactNode
  centered?: boolean
}

export default function Layout({ children, centered }: LayoutProps) {
  const isDark = useIsDark()
  const { data } = useGetMyProfileQuery()
  const [navBarHidden, setNavbarHidden] = useState(false)
  const theme = useMantineTheme()
  const matches = useMediaQuery(`(max-width:${theme.breakpoints.md}px)`)
  useEffect(() => {
    if (matches) {
      setNavbarHidden(true)
    }
  }, [matches, setNavbarHidden])
  return (
    <AppShell
      navbarOffsetBreakpoint='md'
      navbar={
        <Navbar width={{ sm: 250 }} hiddenBreakpoint='md' hidden={navBarHidden}>
          <NavbarSearch />
        </Navbar>
      }
      header={
        matches ? (
          <Header height={50} sx={{ display: 'flex', alignItems: 'center' }}>
            <Burger
              opened={!navBarHidden}
              onClick={() => setNavbarHidden((o) => !o)}
            />
            <Box mx='auto'>
              <AppTitle />
            </Box>
          </Header>
        ) : (
          <></>
        )
      }
      sx={(theme) => ({
        main: {
          backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <EmailVerifiedNoti
        verified={data?.getMyProfile.user.verified !== false}
      />
      {centered ? (
        <Center sx={{ width: '100%', height: '100vh' }}>{children}</Center>
      ) : (
        children
      )}
    </AppShell>
  )
}
