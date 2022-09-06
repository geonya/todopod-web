import { Button } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import ProjectsList from '../components/ProjectsList'
import { useLogoutMutation } from '../lib/graphql/__generated__'

interface Props {}

const Home: NextPage<Props> = () => {
  const router = useRouter()
  const [logout, { loading, data }] = useLogoutMutation({
    onCompleted: (result) => {
      if (result.logout) {
        router.push('/login')
      }
    },
  })
  return (
    <div>
      <h1>This is Home!</h1>
      <Button
        onClick={() => {
          logout()
        }}
      >
        Log out
      </Button>
      <ProjectsList />
    </div>
  )
}

export default Home
