import { useForm } from 'react-hook-form'
import {
  useCreateAccountMutation,
  UserRole,
} from '../lib/graphql/__generated__'
import Head from 'next/head'
import { NextPage } from 'next'
import { Box, Button, Center, createStyles } from '@mantine/core'
import { useStyles } from '../lib/client/styles'

interface AccountFormValues {
  name: string
  email: string
  password: string
  role: UserRole
}

const Account: NextPage = () => {
  const { classes } = useStyles()
  const [createAccountMutation, { data, loading, error }] =
    useCreateAccountMutation()
  const { register, handleSubmit } = useForm<AccountFormValues>({
    mode: 'onSubmit',
    defaultValues: { role: UserRole.Client },
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
      <Center className={classes.wrapper}>
        <h1>Create Account</h1>
        <form className={classes.form} onSubmit={handleSubmit(onValid)}>
          <input
            type='text'
            {...register('name', {
              required: '이름을 입력해주세요.',
              minLength: {
                value: 2,
                message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다.',
              },
              maxLength: {
                value: 10,
                message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다.',
              },
              pattern: {
                value: /^[a-zA-Z0-9]{2,10}$/g,
                message: '2~10자 이내에 영문이나 숫자만 사용 가능합니다.',
              },
            })}
            placeholder='Username'
          />
          <input
            type='text'
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: '이메일 형식이 맞지 않습니다.',
              },
            })}
          />
          <input
            type='password'
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 4,
                message: '비밀번호는 최소 4자 이상이여야 합니다.',
              },
            })}
          />
          <select
            {...register('role', {
              required: '타입을 선택해주세요',
            })}
          >
            {Object.keys(UserRole).map((role, i) => (
              <option key={i}>{role}</option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      </Center>
    </>
  )
}

export default Account
