import { gql } from '@apollo/client'

export const PROJECT_FRAGMENT = gql`
  fragment ProjectFragment on Project {
    id
    title
    description
    creator {
      name
    }
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
