import {
  useCreateAccountMutation,
  UserRole,
} from '../lib/graphql/__generated__'

import { NextPage } from 'next'
import {
  Button,
  Group,
  Menu,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { useState } from 'react'
import { IconChevronDown, IconUser } from '@tabler/icons'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import { useAuthStyles } from '../styles/authStyles'
import { NextLink } from '@mantine/next'
import AuthLayout from '../components/AuthLayout'
import { useRoleStyles } from '../styles/roleStyles'

interface AccountFormValues {
  name: string
  email: string
  password: string
  role: UserRole
}

const Account: NextPage = () => {
  const router = useRouter()
  const [menuOpened, setMenuOpened] = useState(false)
  const [accountError, setAccountError] = useState('')
  const { classes } = useAuthStyles()
  const { classes: roleClasses } = useRoleStyles({ menuOpened })
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
          createAccount: { ok, error },
        } = result
        if (ok) {
          router.push({
            pathname: '/login',
            query: { email: form.values.email },
          })
        }
        if (error) {
          setAccountError(error)
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
    <AuthLayout title='Account'>
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
            onOpen={() => setMenuOpened(true)}
            onClose={() => setMenuOpened(false)}
            radius='md'
            width='target'
          >
            <Menu.Target>
              <UnstyledButton className={roleClasses.rolesControl}>
                <Group spacing='xs'>
                  <IconUser size={20} />
                  <span className={roleClasses.label}>{selected}</span>
                </Group>
                <IconChevronDown
                  size={16}
                  className={roleClasses.icon}
                  stroke={1.5}
                />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{roles}</Menu.Dropdown>
          </Menu>
          <Text>
            아이디가 있다면{' '}
            <Text
              component={NextLink}
              href='/login'
              sx={(theme) => ({
                color: theme.colors.blue[5],
              })}
            >
              로그인
            </Text>
          </Text>
          <Text className={classes.error}>{accountError}</Text>
          <Button type='submit'>Submit</Button>
        </Paper>
      </div>
    </AuthLayout>
  )
}

export default Account
