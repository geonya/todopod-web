import {
  AppShell,
  Box,
  Burger,
  createStyles,
  Header,
  Navbar,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'
import { useGetMyProfileQuery } from '../lib/graphql/__generated__'
import AppTitle from './AppTitle'
import EmailVerifiedNoti from './EmailVerifiedNoti'
import NavbarSearch from './Navbar'

interface LayoutProps {
  children: React.ReactNode
  centered?: boolean
}

const useLayoutStyles = createStyles((theme) => ({
  main: { height: '100%' },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default function Layout({ children, centered }: LayoutProps) {
  const { data } = useGetMyProfileQuery()
  const [navBarHidden, setNavbarHidden] = useState(false)
  const theme = useMantineTheme()
  const matches = useMediaQuery(`(max-width:${theme.breakpoints.md}px)`)
  const { classes, cx } = useLayoutStyles()
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
    >
      <EmailVerifiedNoti
        verified={data?.getMyProfile.user.verified !== false}
      />
      <main className={cx(classes.main, { [classes.centered]: centered })}>
        {children}
      </main>
    </AppShell>
  )
}
