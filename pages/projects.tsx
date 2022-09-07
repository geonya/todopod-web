import { GetServerSideProps } from 'next'
import ProjectsList from '../components/ProjectsList'
import { JWT_TOKEN } from '../constants'

export default function Projects() {
  return <ProjectsList />
}
