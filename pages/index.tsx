import { Text } from '@mantine/core'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import ProjectsList from '../components/ProjectsList'
import { JWT_TOKEN } from '../constants'
import { isLoggedInVar } from '../lib/client/apolloVars'

interface HomeProps {
  token?: string
}

const Home: NextPage<HomeProps> = ({ token }) => {
  useEffect(() => {
    if (token) {
      isLoggedInVar(true)
    }
  }, [token])
  return (
    <div>
      <h1>This is Home!</h1>
      <ProjectsList />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies[JWT_TOKEN]
  return {
    props: {
      token,
    },
  }
}

export default Home
