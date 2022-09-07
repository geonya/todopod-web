import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  caption: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  project: Project;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CommentInputType = {
  caption: Scalars['String'];
  project: ProjectInputType;
  user: UserInputType;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePhotoInputType = {
  caption: Scalars['String'];
  projectId?: InputMaybe<Scalars['Int']>;
  taskId?: InputMaybe<Scalars['Int']>;
};

export type CreatePhotoOutput = {
  __typename?: 'CreatePhotoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateProjectInputType = {
  description?: InputMaybe<Scalars['String']>;
  tagNames?: InputMaybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type CreateProjectOutput = {
  __typename?: 'CreateProjectOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateTaskInputType = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectId: Scalars['Int'];
  tagsName?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateTaskOutput = {
  __typename?: 'CreateTaskOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateTeamInputType = {
  name: Scalars['String'];
};

export type CreateTeamOutput = {
  __typename?: 'CreateTeamOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateTodoInputType = {
  payload: Scalars['String'];
  tagNames?: InputMaybe<Array<Scalars['String']>>;
  taskId: Scalars['Int'];
};

export type CreateTodoOutput = {
  __typename?: 'CreateTodoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteAccountInputType = {
  id: Scalars['Int'];
};

export type DeleteAccountOutput = {
  __typename?: 'DeleteAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeletePhotoInput = {
  id: Scalars['Int'];
};

export type DeletePhotoOutput = {
  __typename?: 'DeletePhotoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteProjectInputType = {
  id: Scalars['Int'];
};

export type DeleteProjectOutput = {
  __typename?: 'DeleteProjectOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteTaskInputType = {
  id: Scalars['Int'];
};

export type DeleteTaskOutput = {
  __typename?: 'DeleteTaskOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteTeamInputType = {
  id: Scalars['Int'];
};

export type DeleteTeamOutput = {
  __typename?: 'DeleteTeamOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteTodoInputType = {
  id: Scalars['Int'];
};

export type DeleteTodoOutput = {
  __typename?: 'DeleteTodoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditAccountInputType = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export type EditAccountOutput = {
  __typename?: 'EditAccountOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditPhotoInputType = {
  caption: Scalars['String'];
  id: Scalars['Int'];
};

export type EditPhotoOutput = {
  __typename?: 'EditPhotoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditProjectInputType = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  inviteUserId?: InputMaybe<Scalars['Int']>;
  tagNames?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
  withdrawUserId?: InputMaybe<Scalars['Int']>;
};

export type EditProjectOutput = {
  __typename?: 'EditProjectOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditTaskInputType = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  tagNames?: InputMaybe<Array<Scalars['String']>>;
};

export type EditTaskOutput = {
  __typename?: 'EditTaskOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditTeamInputType = {
  id?: InputMaybe<Scalars['Int']>;
  inviteUserId?: InputMaybe<Scalars['Int']>;
  leaderId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  withdrawMemberId?: InputMaybe<Scalars['Int']>;
};

export type EditTeamOutput = {
  __typename?: 'EditTeamOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditTodoInputType = {
  id: Scalars['Int'];
  payload: Scalars['String'];
  process: ProcessEnum;
  tagNames?: InputMaybe<Array<Scalars['String']>>;
};

export type EditTodoOutput = {
  __typename?: 'EditTodoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type FindUserByIdInput = {
  id: Scalars['Int'];
};

export type FindUserByIdOutput = {
  __typename?: 'FindUserByIdOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type GetProjectInputType = {
  id: Scalars['Int'];
};

export type GetProjectOutput = {
  __typename?: 'GetProjectOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  project?: Maybe<Project>;
};

export type GetProjectsInput = {
  page?: InputMaybe<Scalars['Int']>;
};

export type GetProjectsOutput = {
  __typename?: 'GetProjectsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  projects?: Maybe<Array<Project>>;
  totalPages?: Maybe<Scalars['Int']>;
  totalProjectsCount?: Maybe<Scalars['Int']>;
};

export type GetTaskInputType = {
  id: Scalars['Int'];
};

export type GetTaskOutput = {
  __typename?: 'GetTaskOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  task?: Maybe<Task>;
};

export type GetTasksInputType = {
  pages?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
};

export type GetTasksOutput = {
  __typename?: 'GetTasksOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  tasks?: Maybe<Array<Task>>;
};

export type GetTeamInputType = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type GetTeamOutput = {
  __typename?: 'GetTeamOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  team?: Maybe<Team>;
};

export type GetTodoInputType = {
  id: Scalars['Int'];
};

export type GetTodoOutput = {
  __typename?: 'GetTodoOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  todo?: Maybe<Todo>;
};

export type GetTodosInputType = {
  pages?: InputMaybe<Scalars['Int']>;
  taskId: Scalars['Int'];
};

export type GetTodosOutput = {
  __typename?: 'GetTodosOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  todos?: Maybe<Array<Todo>>;
};

export type JoinTeamInputType = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type LogoutOutput = {
  __typename?: 'LogoutOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createPhoto: CreatePhotoOutput;
  createProject: CreateProjectOutput;
  createTask: CreateTaskOutput;
  createTeam: CreateTeamOutput;
  createTodo: CreateTodoOutput;
  deleteAccount: DeleteAccountOutput;
  deletePhoto: DeletePhotoOutput;
  deleteProject: DeleteProjectOutput;
  deleteTask: DeleteTaskOutput;
  deleteTeam: DeleteTeamOutput;
  deleteTodo: DeleteTodoOutput;
  editAccount: EditAccountOutput;
  editPhoto: EditPhotoOutput;
  editProject: EditProjectOutput;
  editTask: EditTaskOutput;
  editTeam: EditTeamOutput;
  editTodo: EditTodoOutput;
  joinTeam: CreateTeamOutput;
  login: LoginOutput;
  logout: LogoutOutput;
  verifyEmail: VerifyEmailOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreatePhotoArgs = {
  file: Scalars['Upload'];
  input: CreatePhotoInputType;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInputType;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInputType;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInputType;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInputType;
};


export type MutationDeleteAccountArgs = {
  input: DeleteAccountInputType;
};


export type MutationDeletePhotoArgs = {
  input: DeletePhotoInput;
};


export type MutationDeleteProjectArgs = {
  input: DeleteProjectInputType;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInputType;
};


export type MutationDeleteTeamArgs = {
  input: DeleteTeamInputType;
};


export type MutationDeleteTodoArgs = {
  input: DeleteTodoInputType;
};


export type MutationEditAccountArgs = {
  input: EditAccountInputType;
};


export type MutationEditPhotoArgs = {
  input: EditPhotoInputType;
};


export type MutationEditProjectArgs = {
  input: EditProjectInputType;
};


export type MutationEditTaskArgs = {
  input: EditTaskInputType;
};


export type MutationEditTeamArgs = {
  input: EditTeamInputType;
};


export type MutationEditTodoArgs = {
  input: EditTodoInputType;
};


export type MutationJoinTeamArgs = {
  input: JoinTeamInputType;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInputType;
};

export type MyProfileOutput = {
  __typename?: 'MyProfileOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user: User;
};

export type Photo = {
  __typename?: 'Photo';
  caption: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  key: Scalars['String'];
  projectId?: Maybe<Scalars['Int']>;
  taskId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type PhotoInputType = {
  caption: Scalars['String'];
  key: Scalars['String'];
  projectId?: InputMaybe<Scalars['Int']>;
  taskId?: InputMaybe<Scalars['Int']>;
  url: Scalars['String'];
};

export enum ProcessEnum {
  Doing = 'doing',
  Done = 'done',
  Ready = 'ready'
}

export type Project = {
  __typename?: 'Project';
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  members: Array<User>;
  photos?: Maybe<Array<Photo>>;
  tags: Array<Tag>;
  tasks?: Maybe<Array<Task>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectInputType = {
  comments?: InputMaybe<Array<CommentInputType>>;
  creator: UserInputType;
  description?: InputMaybe<Scalars['String']>;
  members: Array<UserInputType>;
  photos?: InputMaybe<Array<PhotoInputType>>;
  tags: Array<TagInputType>;
  tasks?: InputMaybe<Array<TaskInputType>>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findUserById: FindUserByIdOutput;
  getMyProfile: MyProfileOutput;
  getProject: GetProjectOutput;
  getProjects: GetProjectsOutput;
  getTask: GetTaskOutput;
  getTasks: GetTasksOutput;
  getTeam: GetTeamOutput;
  getTodo: GetTodoOutput;
  getTodos: GetTodosOutput;
};


export type QueryFindUserByIdArgs = {
  input: FindUserByIdInput;
};


export type QueryGetProjectArgs = {
  input: GetProjectInputType;
};


export type QueryGetProjectsArgs = {
  input: GetProjectsInput;
};


export type QueryGetTaskArgs = {
  input: GetTaskInputType;
};


export type QueryGetTasksArgs = {
  input: GetTasksInputType;
};


export type QueryGetTeamArgs = {
  input: GetTeamInputType;
};


export type QueryGetTodoArgs = {
  input: GetTodoInputType;
};


export type QueryGetTodosArgs = {
  input: GetTodosInputType;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TagInputType = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['DateTime'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  photos?: Maybe<Array<Photo>>;
  projectId: Scalars['Int'];
  tags?: Maybe<Array<Tag>>;
  todos?: Maybe<Array<Todo>>;
  updatedAt: Scalars['DateTime'];
};

export type TaskInputType = {
  creator: UserInputType;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  photos?: InputMaybe<Array<PhotoInputType>>;
  projectId: Scalars['Int'];
  tags?: InputMaybe<Array<TagInputType>>;
  todos?: InputMaybe<Array<TodoInputType>>;
};

export type Team = {
  __typename?: 'Team';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  leaderId?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type TeamInputType = {
  leaderId?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  users?: InputMaybe<Array<UserInputType>>;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  process: ProcessEnum;
  tags?: Maybe<Array<Tag>>;
  task: Task;
  taskId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type TodoInputType = {
  payload: Scalars['String'];
  process: ProcessEnum;
  tags?: InputMaybe<Array<TagInputType>>;
  task: TaskInputType;
  taskId: Scalars['Int'];
  user: UserInputType;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  comments?: Maybe<Array<Comment>>;
  company?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  myProjects?: Maybe<Array<Project>>;
  name: Scalars['String'];
  password: Scalars['String'];
  photos?: Maybe<Array<Photo>>;
  role: UserRole;
  tasks?: Maybe<Array<Task>>;
  team?: Maybe<Team>;
  todos?: Maybe<Array<Todo>>;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export type UserInputType = {
  address?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  comments?: InputMaybe<Array<CommentInputType>>;
  company?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  myProjects?: InputMaybe<Array<ProjectInputType>>;
  name: Scalars['String'];
  password: Scalars['String'];
  photos?: InputMaybe<Array<PhotoInputType>>;
  role: UserRole;
  tasks?: InputMaybe<Array<TaskInputType>>;
  team?: InputMaybe<TeamInputType>;
  todos?: InputMaybe<Array<TodoInputType>>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export enum UserRole {
  Admin = 'Admin',
  Client = 'Client',
  Producer = 'Producer'
}

export type VerifyEmailInputType = {
  code: Scalars['String'];
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type ProjectFragmentFragment = { __typename?: 'Project', id: number, title: string, description?: string | null, tasks?: Array<{ __typename?: 'Task', name: string }> | null };

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountOutput', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null, token?: string | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutOutput', ok: boolean, error?: string | null } };

export type GetProjectsQueryVariables = Exact<{
  input: GetProjectsInput;
}>;


export type GetProjectsQuery = { __typename?: 'Query', getProjects: { __typename?: 'GetProjectsOutput', ok: boolean, error?: string | null, totalProjectsCount?: number | null, totalPages?: number | null, projects?: Array<{ __typename?: 'Project', id: number, title: string, description?: string | null, tasks?: Array<{ __typename?: 'Task', name: string }> | null }> | null } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', getMyProfile: { __typename?: 'MyProfileOutput', ok: boolean, error?: string | null, user: { __typename?: 'User', name: string, role: UserRole, email: string } } };

export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  title
  description
  tasks {
    name
  }
}
    `;
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ok
    error
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ok
    error
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    ok
    error
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const GetProjectsDocument = gql`
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
}
    ${ProjectFragmentFragmentDoc}`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetMyProfileDocument = gql`
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
    `;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
      }
export function useGetMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileQueryResult = Apollo.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;