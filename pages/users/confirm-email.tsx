import { gql, useApolloClient } from '@apollo/client'
import { Center, Loader, Stack, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/Layout'
import {
  useGetMyProfileQuery,
  useVerifyEmailMutation,
} from '../../lib/graphql/__generated__'

export default function ConfirmEmail() {
  const { data: userData } = useGetMyProfileQuery()
  const client = useApolloClient()
  const router = useRouter()
  const [verifyEmail, { loading }] = useVerifyEmailMutation({
    onCompleted: (data) => {
      if (data.verifyEmail.ok && userData?.getMyProfile.user.id) {
        client.writeFragment({
          id: `User:${userData.getMyProfile.user.id}`,
          fragment: gql`
            fragment verifiedUser on User {
              verified
            }
          `,
          data: {
            verified: true,
          },
        })
        router.replace('/')
      } else {
        router.replace('/users/profile')
      }
    },
  })

  useEffect(() => {
    const [, code] = window.location.href.split('code=')
    if (!code) {
      router.push('/')
      return
    }
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    })
  }, [verifyEmail, router])

  return (
    <Layout>
      <Center sx={{ width: '100%', height: '100vh' }}>
        <Stack align='center'>
          {loading && <Loader />}
          <Text>이메일을 확인하고 있습니다. </Text>
          <Text>페이지를 종료하지 말아주세요.</Text>
        </Stack>
      </Center>
    </Layout>
  )
}
