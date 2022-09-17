import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    createdAt
    updatedAt
    name
    password
    email
    company
    address
    avatar {
      url
    }
    verified
    role
    myProjects {
      ...ProjectFragment
    }
    tasks {
      ...TaskFragment
    }
    comments {
      id
      caption
    }
    todos {
      payload
    }
    photos {
      id
      url
      caption
    }
    team {
      name
      users {
        name
      }
    }
  }
`

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

export const TASK_FRAGMENT = gql`
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
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
  mutation EditAccount($input: EditAccountInput!) {
    editAccount(input: $input) {
      ok
      error
    }
  }
  mutation SendVerificationEmail($input: SendVerificationEmailInput!) {
    sendVerificationEmail(input: $input) {
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
        ...UserFragment
      }
    }
    ${USER_FRAGMENT}
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
