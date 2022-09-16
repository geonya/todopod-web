import { AppShell, Center, Notification } from '@mantine/core'
import React from 'react'
import useIsDark from '../hooks/useIsDark'
import { useGetMyProfileQuery } from '../lib/graphql/__generated__'
import NavbarSearch from './Navbar'

interface LayoutProps {
  children: React.ReactNode
  centered?: boolean
}

export default function Layout({ children, centered }: LayoutProps) {
  const isDark = useIsDark()
  const { data } = useGetMyProfileQuery()
  return (
    <AppShell
      navbar={<NavbarSearch />}
      sx={(theme) => ({
        main: {
          backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      {data?.getMyProfile.user.verified === false ? (
        <Notification
          color='red'
          sx={{
            width: '50%',
            position: 'absolute',
            left: 0,
            right: 0,
            margin: '0 auto',
            top: 10,
            zIndex: 999,
          }}
          disallowClose
        >
          이메일 확인이 필요합니다.
        </Notification>
      ) : null}

      {centered ? (
        <Center sx={{ width: '100%', height: '100vh' }}>{children}</Center>
      ) : (
        children
      )}
    </AppShell>
  )
}
