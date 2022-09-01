import {
  useCreateAccountMutation,
  UserRole,
} from '../lib/graphql/__generated__'
import Head from 'next/head'
import { NextPage } from 'next'
import {
  Button,
  createStyles,
  Group,
  Menu,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { useGlobalStyles } from '../lib/client/styles/global'
import { useState } from 'react'
import { IconChevronDown, IconUser } from '@tabler/icons'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'

interface AccountFormValues {
  name: string
  email: string
  password: string
  role: UserRole
}

const Account: NextPage = () => {
  const router = useRouter()
  const [opened, setOpened] = useState(false)
  const { classes } = useAccountStyles({ opened })
  const [selected, setSelected] = useState(UserRole['Client'])
  const form = useForm<AccountFormValues>({
    initialValues: { name: '', email: '', password: '', role: UserRole.Client },
    validate: {
      email: (value) => {
        if (
          !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
            value,
          )
        )
          return '이메일 형식이 맞지 않습니다.'
      },
      name: (value) => {
        if (value.length < 2)
          return '2~10자 이내에 영문이나 숫자만 사용 가능합니다.'
        if (value.length > 10)
          return '2~10자 이내에 영문이나 숫자만 사용 가능합니다.'
        if (!/^[a-zA-Z0-9]{2,10}$/g.test(value)) {
          return '2~10자 이내에 영문이나 숫자만 사용 가능합니다.'
        }
      },
      password: (value) =>
        value.length < 4 ? '비밀번호는 최소 4자 이상이여야 합니다.' : null,
    },
    validateInputOnChange: true,
  })
  const handleRoleSelect = (role: UserRole) => {
    setSelected(role)
    form.setFieldValue('role', role)
  }
  const roles = (Object.keys(UserRole) as Array<keyof typeof UserRole>).map(
    (key, i) => (
      <Menu.Item
        key={i}
        icon={<IconUser size={20} />}
        onClick={() => handleRoleSelect(UserRole[key])}
      >
        {UserRole[key]}
      </Menu.Item>
    ),
  )

  const [createAccountMutation, { data, loading, error }] =
    useCreateAccountMutation({
      onCompleted: (result) => {
        const {
          createAccount: { ok },
        } = result
        if (ok) {
          router.push({
            pathname: '/login',
            query: { email: form.values.email },
          })
        }
      },
    })

  const onValid = (data: AccountFormValues) => {
    if (loading) return
    createAccountMutation({
      variables: {
        input: {
          ...data,
        },
      },
    })
  }
  return (
    <>
      <Head>
        <title>Account | Todopod</title>
      </Head>
      <div className={classes.wrapper}>
        <Paper
          component='form'
          radius={0}
          className={classes.form}
          p={30}
          onSubmit={form.onSubmit(onValid)}
        >
          <Title
            order={2}
            className={classes.title}
            align='center'
            mt='md'
            mb={50}
          >
            Welcome to Todopod!
          </Title>
          <TextInput
            withAsterisk
            size='md'
            label='Username'
            {...form.getInputProps('name')}
            placeholder='Username'
          />
          <TextInput
            withAsterisk
            label='Email Address'
            size='md'
            placeholder='E-mail'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            label='Password'
            size='md'
            {...form.getInputProps('password')}
          />
          <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
            radius='md'
            width='target'
          >
            <Menu.Target>
              <UnstyledButton className={classes.rolesControl}>
                <Group spacing='xs'>
                  <IconUser size={20} />
                  <span className={classes.label}>{selected}</span>
                </Group>
                <IconChevronDown
                  size={16}
                  className={classes.icon}
                  stroke={1.5}
                />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{roles}</Menu.Dropdown>
          </Menu>
          <Button type='submit'>Submit</Button>
        </Paper>
      </div>
    </>
  )
}

export default Account

interface IParams {
  opened: boolean
}

const useAccountStyles = createStyles((theme, params: IParams) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },
  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: 500,
    width: '100%',
    paddingTop: 80,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}))
