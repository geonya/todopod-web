import { Button, Text } from '@mantine/core'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import ProjectsList from '../components/ProjectsList'
import {
  useGetMyProfileQuery,
  useLogoutMutation,
} from '../lib/graphql/__generated__'

interface Props {}

const Home: NextPage<Props> = () => {
  const router = useRouter()
  const [logout, { loading }] = useLogoutMutation({
    onCompleted: (result) => {
      if (result.logout.ok) {
        router.push('/login')
      }
      if (result.logout.error) {
        alert(result.logout.error)
      }
    },
  })
  const { data } = useGetMyProfileQuery({
    onCompleted(data) {
      if (!data.getMyProfile.ok || !data.getMyProfile.user) {
        router.push('/login')
      }
    },
  })

  return (
    <div>
      <h1>This is Home!</h1>
      <Button onClick={() => logout()} disabled={loading}>
        Log out
      </Button>
      <Text>Username : {data?.getMyProfile.user.name}</Text>
      <ProjectsList />
    </div>
  )
}

export default Home
