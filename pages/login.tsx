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
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuthStyles } from '../lib/client/styles/authStyles'

interface LoginFormValues {
  email: string
  password: string
}

const Login = () => {
  const { classes } = useAuthStyles({})
  const router = useRouter()
  console.log(router.query)
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: 'EMAIL',
      password: '',
    },
  })
  const onValid = (data: LoginFormValues) => {}
  return (
    <>
      <Head>
        <title>Log In | Todopod</title>
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
          <Button type='submit'>Submit</Button>
        </Paper>
      </div>
    </>
  )
}

export default Login
