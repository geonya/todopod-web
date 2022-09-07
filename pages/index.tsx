import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import { JWT_TOKEN } from '../constants'
import { isLoggedInVar } from '../lib/client/apolloVars'

interface HomeProps {
  token?: string
}

const Home: NextPage<HomeProps> = ({ token }) => {
  return (
    <div>
      <h1>This is Home!</h1>
    </div>
  )
}

export default Home
