import { useApolloClient } from '@apollo/client'
import {
  ActionIcon,
  Badge,
  Box,
  Code,
  createStyles,
  Group,
  Navbar,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { NextLink } from '@mantine/next'
import {
  IconBulb,
  IconCheckbox,
  IconLogout,
  IconPlus,
  IconSearch,
  IconSelector,
  IconSwitchHorizontal,
  IconUser,
} from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useIsDark from '../hooks/useIsDark'

import { isLoggedInVar } from '../lib/client/apolloVars'
import {
  useGetMyProfileQuery,
  useLogoutMutation,
} from '../lib/graphql/__generated__'
import AppTitle from './AppTitle'
import ThemeToggle from './ThemeToggle'
import UserButton from './UserButton'

const useStyles = createStyles((theme) => ({
  section: {
    padding: '5px 0',
    '&:not(:last-of-type)': {
      borderBottom: `1px solid ${
        useIsDark() ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },
  },
  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor: useIsDark() ? theme.colors.dark[7] : theme.colors.gray[0],
    border: `1px solid ${
      useIsDark() ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },
  mainLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: theme.fontSizes.xs,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: useIsDark() ? theme.colors.dark[0] : theme.colors.gray[7],
    '&:hover': {
      backgroudColor: useIsDark() ? theme.colors.dark[6] : theme.colors.gray[0],
      color: useIsDark() ? theme.white : theme.black,
    },
  },
  mainLinkInner: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color: useIsDark() ? theme.colors.dark[2] : theme.colors.gray[6],
  },
  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    marginLeft: 5,
    pointerEvents: 'none',
  },
  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },
  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },
  collectionLink: {
    display: 'flex',
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: 'none',
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color: useIsDark() ? theme.colors.dark[0] : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: useIsDark()
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
      color: useIsDark() ? theme.white : theme.black,
    },
  },
}))

const links = [
  { icon: IconBulb, label: 'Project', notifications: 3 },
  { icon: IconCheckbox, label: 'Todo', notifications: 4 },
  { icon: IconUser, label: 'Team' },
]

const collections = [
  { emoji: '👍', label: '간판' },
  { emoji: '🚚', label: '브랜딩' },
  { emoji: '💸', label: '웹개발' },
  { emoji: '💰', label: '제작' },
  { emoji: '✨', label: '영업' },
  { emoji: '🛒', label: '견적 요청' },
  { emoji: '📅', label: '일정' },
]

export default function NavbarSearch() {
  const { classes } = useStyles()
  const { data } = useGetMyProfileQuery()
  const router = useRouter()
  const client = useApolloClient()
  const [logout, { loading }] = useLogoutMutation({
    onCompleted: (result) => {
      if (result.logout.ok) {
        isLoggedInVar(false)
        router.push('/login')
        // reset cache
        client.clearStore()
      }
      if (result.logout.error) {
        console.error(result.logout.error)
        alert(result.logout.error)
      }
    },
  })

  const mainLinks = links.map((link, i) => (
    <UnstyledButton
      key={i}
      className={classes.mainLink}
      component={NextLink}
      href={'/projects'}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size='sm' variant='filled' className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ))

  const collectionLinks = collections.map((collection, i) => (
    <Link key={i} href='/'>
      <a className={classes.collectionLink} onClick={(e) => e.preventDefault()}>
        <span style={{ marginRight: 9, fontSize: 16 }}>{collection.emoji}</span>{' '}
        {collection.label}
      </a>
    </Link>
  ))
  return (
    <>
      <Navbar.Section className={classes.section}>
        <AppTitle />
      </Navbar.Section>
      <Navbar.Section
        className={classes.section}
        onClick={() => router.push('/users/profile')}
      >
        <UserButton
          image='https://i.imgur.com/fGxgcDF.png'
          name={data?.getMyProfile.user.name || 'user'}
          email={data?.getMyProfile.user.email || 'email'}
          icon={<IconSelector size={14} stroke={1.5} />}
        />
      </Navbar.Section>
      <TextInput
        placeholder='Search'
        size='xs'
        icon={<IconSearch size={12} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        my='md'
      />
      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>
      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position='apart'>
          <Text size='xs' weight={500} color='dimmed'>
            Collections
          </Text>
          <Tooltip label='Create collection' withArrow position='right'>
            <ActionIcon variant='default' size={18}>
              <IconPlus size={12} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
      </Navbar.Section>
      <Navbar.Section className={classes.section}>
        <UnstyledButton className={classes.mainLink}>
          <div className={classes.mainLinkInner}>
            <IconSwitchHorizontal size={20} className={classes.mainLinkIcon} />
            <span>Change Account</span>
          </div>
        </UnstyledButton>
        <UnstyledButton
          className={classes.mainLink}
          onClick={() => logout()}
          disabled={loading}
        >
          <div className={classes.mainLinkInner}>
            <IconLogout size={20} className={classes.mainLinkIcon} />
            <span>Log Out</span>
          </div>
        </UnstyledButton>
      </Navbar.Section>
      <Box mt={20}>
        <ThemeToggle />
      </Box>
    </>
  )
}
