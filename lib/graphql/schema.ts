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
`
