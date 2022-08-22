import type { GetStaticProps, NextPage } from 'next'

const Home: NextPage = () => {
  return <div>todopod web</div>
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
  }
}

export default Home
