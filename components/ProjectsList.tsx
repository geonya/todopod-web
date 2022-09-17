import { Grid } from '@mantine/core'
import ProjectCard from './Project'

interface IProject {
  id: number
  title: string
  description?: string | null
}

interface ProjectsProps {
  projects?: IProject[] | null
}

export default function ProjectsList({ projects }: ProjectsProps) {
  return (
    <Grid>
      {projects?.map((project, i) => (
        <Grid.Col xs={6} sm={4} md={3} lg={3} xl={2} key={i}>
          <ProjectCard
            id={project.id}
            image={
              'https://img.freepik.com/free-photo/businessmen-businesswomen-meeting-brainstorming-ideas_7861-3065.jpg?w=996&t=st=1662533026~exp=1662533626~hmac=f8234c09f36abf7e2901466d036e3f3af30b62248d2c1036b5b04ca58b079c36'
            }
            title={project.title}
            description={project.description || ''}
            tags={['tag', 'test', 'todopod']}
          />
        </Grid.Col>
      ))}
    </Grid>
  )
}
