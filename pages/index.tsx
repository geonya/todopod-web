import type { NextPage } from 'next'
import Layout from '../components/Layout'

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return (
    <Layout title='Home'>
      <h1>This is Home!</h1>
    </Layout>
  )
}

export default Home
