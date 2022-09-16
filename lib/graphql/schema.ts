import { gql } from '@apollo/client'

const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    id
    title
    description
    tasks {
      name
    }
  }
`

const TASK_FRAGMENT = gql`
  fragment TaskFragment on Task {
    id
    name
    description
    creator {
      name
      email
    }
    projectId
    todos {
      payload
    }
    tags {
      name
      slug
    }
    photos {
      url
    }
  }
`

gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }

  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }

  mutation Logout {
    logout {
      ok
      error
    }
  }

  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ok
      error
    }
  }
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      ok
      error
    }
  }
`

gql`
 query GetProjects($input: GetProjectsInput!) {
    getProjects(input: $input) {
      ok
      error
      projects {
        ...ProjectFragment
      }
      totalProjectsCount
      totalPages
    }
    ${PROJECT_FRAGMENT}
  }
  query GetProject($input:GetProjectInput!) {
    getProject(input:$input) {
      ok
      error
      project {
        ...ProjectFragment
      }
    }
    ${PROJECT_FRAGMENT}
  }

  query GetMyProfile {
    getMyProfile {
      ok
      error
      user {
        name
        role
        email
      }
    }
  }

  query GetTasks($input:GetTasksInput!) {
    getTasks(input:$input) {
      ok
      error
      tasks {
        ...TaskFragment
      }
    }
    ${TASK_FRAGMENT}
  }
`
