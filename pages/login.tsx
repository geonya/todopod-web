import {
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { NextLink } from '@mantine/next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { isLoggedInVar } from '../lib/client/apolloVars'
import { useAuthStyles } from '../lib/client/styles/authStyles'
import { useLoginMutation } from '../lib/graphql/__generated__'

interface LoginFormValues {
  email: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const { classes } = useAuthStyles({})
  const [loginError, setLoginError] = useState('')
  const [login, { loading }] = useLoginMutation({
    onCompleted(result) {
      if (result.login.ok && result.login.token) {
        isLoggedInVar(true)
        router.push('/')
      }
      if (result.login.error) {
        setLoginError(result.login.error)
      }
    },
  })
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: (router.query.email as string) || '',
      password: '',
    },
    validate: {
      email: (value) => {
        if (
          !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
            value,
          )
        )
          return '이메일 형식이 맞지 않습니다.'
      },
      password: (value) =>
        value.length < 4 ? '비밀번호는 최소 4자 이상이여야 합니다.' : null,
    },
    validateInputOnChange: true,
  })
  const onValid = ({ email, password }: LoginFormValues) => {
    if (loading) return
    login({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
  }
  return (
    <AuthLayout title='Log In'>
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
            Todopod 로그인
          </Title>
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
          <Text>
            아이디가 없으시다면{' '}
            <Text
              component={NextLink}
              href='/account'
              sx={(theme) => ({
                color: theme.colors.blue[5],
              })}
            >
              회원가입
            </Text>
          </Text>
          <Text className={classes.error}>{loginError}</Text>
          <Button type='submit' disabled={loading}>
            {loading ? 'Loading...' : 'Log In'}
          </Button>
        </Paper>
      </div>
    </AuthLayout>
  )
}

export default Login
