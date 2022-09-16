import { Center, Title } from '@mantine/core'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <Center sx={{ width: '100%', height: '100vh' }}>
        <Title order={2}>페이지를 찾을 수 없습니다. 😭</Title>
      </Center>
    </Layout>
  )
}
