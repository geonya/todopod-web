import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from '@mantine/core'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}))

export default function NotFound() {
  const { classes } = useStyles()
  const router = useRouter()
  return (
    <Layout>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>존재하지 않는 페이지입니다.</Title>
        <Text
          color='dimmed'
          size='lg'
          align='center'
          className={classes.description}
        >
          죄송합니다. 이 페이지는 접근이 불가능합니다.
        </Text>
        <Group position='center' onClick={() => router.push('/')}>
          <Button variant='subtle' size='md'>
            메인 페이지로 돌아가시겠습니까?
          </Button>
        </Group>
      </Container>
    </Layout>
  )
}
