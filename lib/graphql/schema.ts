import { gql } from '@apollo/client'

export const PROJECT_FRAGMENT = gql`
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
    logout
  }
`

export const GET_PROJECTS_QUERY = gql`
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
`
