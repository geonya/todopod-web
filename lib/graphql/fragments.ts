import { gql } from '@apollo/client'

gql`
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`

export const GET_PROJECTS_QUERY = gql`
  query GetProjects($getProjectsInput: GetProjectsInput!) {
    getProjects(input: $getProjectsInput) {
      ok
      error
      projects {
        id
        title
      }
      totalProjectsCount
      totalPages
    }
  }
`
