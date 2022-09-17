import { gql, useApolloClient } from '@apollo/client'
import {
  Avatar,
  Box,
  Button,
  CloseButton,
  Group,
  Menu,
  PasswordInput,
  Stack,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { IconChevronDown, IconUser } from '@tabler/icons'
import { useEffect, useState } from 'react'
import Label from '../../components/Label'
import Layout from '../../components/Layout'
import {
  useEditAccountMutation,
  useGetMyProfileQuery,
  UserRole,
  useSendVerificationEmailMutation,
} from '../../lib/graphql/__generated__'
import { useRoleStyles } from '../../styles/roleStyles'

interface UserFormValues {
  name?: string
  password?: string
  email?: string
  company?: string
  role?: UserRole
}

export default function Profile() {
  // Avatar
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const makeObjectUrl = (file: File) => {
    const imageUrl = URL.createObjectURL(file)
    return imageUrl
  }
  const uploadFileIntoDropzone = (files: File[]) => {
    if (!files || files.length === 0) return
    const file = files[0]
    const imageUrl = makeObjectUrl(file)
    setPreviewAvatarUrl(imageUrl)
    setAvatarFile(file)
  }

  const avatarPreview = (size: number) => {
    if (previewAvatarUrl) {
      return (
        <Box>
          <Avatar
            src={previewAvatarUrl}
            size={size}
            radius={size / 2}
            onLoad={() => URL.revokeObjectURL(previewAvatarUrl)}
            sx={{}}
          />
        </Box>
      )
    }
    if (avatarUrl) {
      return (
        <Avatar
          src={avatarUrl}
          size={size}
          radius={size / 2}
          onLoad={() => URL.revokeObjectURL(avatarUrl)}
        />
      )
    }
    return (
      <Avatar
        size={size}
        styles={{
          placeholder: { background: 'none', margin: 0, padding: 0 },
        }}
      />
    )
  }
  //

  // Role
  const [menuOpened, setMenuOpened] = useState(false)
  const [selectedRole, setSelectedRole] = useState(UserRole['Client'])
  const { classes: roleClasses } = useRoleStyles({ menuOpened })
  //

  const { data } = useGetMyProfileQuery()
  const userData = data?.getMyProfile.user

  const userForm = useForm<UserFormValues>({
    initialValues: {
      name: '',
      password: '',
      email: '',
      company: '',
    },
  })
  const client = useApolloClient()

  const [updateProfile, { loading }] = useEditAccountMutation({
    onCompleted: (data) => {
      console.log(userData?.email, userForm.values.email)
      if (data.editAccount.ok && userData?.id) {
        if (userData?.email !== userForm.values.email) {
          client.writeFragment({
            id: `User:${userData.id}`,
            fragment: gql`
              fragment verifiedUser on User {
                email
                verified
              }
            `,
            data: {
              email: userForm.values.email,
              verified: false,
            },
          })
        }
      }
    },
  })

  const userFormOnSubmit = async (data: UserFormValues) => {
    try {
      await updateProfile({
        variables: {
          input: {
            name: data.name,
            ...(data.password && { password: data.password }),
            email: data.email,
            ...(data.company && { company: data.company }),
            role: selectedRole,
            file: avatarFile,
          },
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const [sendVerificationEmail] = useSendVerificationEmailMutation()

  const emailVerify = async () => {
    const email = userForm.values.email
    if (!email) return
    await sendVerificationEmail({
      variables: {
        input: {
          email,
        },
      },
    })
  }

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    userForm.setFieldValue('role', role)
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

  useEffect(() => {
    if (!userData) return
    userForm.setFieldValue('name', userData.name)
    userForm.setFieldValue('email', userData.email)
    userForm.setFieldValue('company', userData.company || '')
    setSelectedRole(userData.role)
    setAvatarUrl(userData.avatar?.url || null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const isEmailVerified = data?.getMyProfile.user.verified === false
  return (
    <Layout centered>
      <Box
        component='form'
        onSubmit={userForm.onSubmit(userFormOnSubmit)}
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {(previewAvatarUrl || avatarUrl) && (
            <CloseButton
              size={15}
              color='red'
              onClick={() => {
                setPreviewAvatarUrl(null)
                setAvatarUrl(null)
              }}
              sx={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}
            />
          )}

          <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={uploadFileIntoDropzone}
            styles={{
              root: {
                border: 'none',
                background: 'none',
                padding: 0,
              },
            }}
          >
            {avatarPreview(120)}
          </Dropzone>
        </Box>

        <TextInput
          {...userForm.getInputProps('name')}
          label='이름'
          placeholder={data?.getMyProfile.user.name}
          sx={{ width: '100%' }}
        />
        <PasswordInput
          {...userForm.getInputProps('password')}
          label='비밀번호'
          sx={{ width: '100%' }}
        />
        <TextInput
          {...userForm.getInputProps('email')}
          label='E-Mail'
          placeholder={data?.getMyProfile.user.email}
          sx={{ width: '100%' }}
          error={
            isEmailVerified && '이메일 인증이 필요합니다. 메일함을 확인해주세요'
          }
        />
        {isEmailVerified && (
          <Button
            color='red'
            onClick={emailVerify}
            sx={{ width: '100%' }}
            my={10}
          >
            E-Mail 인증 다시 보내기
          </Button>
        )}

        <TextInput
          {...userForm.getInputProps('company')}
          label='회사'
          placeholder={data?.getMyProfile.user.company}
          sx={{ width: '100%' }}
        />

        <Box
          sx={{
            width: '100%',
          }}
        >
          <Label>역할 선택</Label>
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
                  <span className={roleClasses.label}>{selectedRole}</span>
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
        </Box>
        <Stack mt={20} sx={{ width: '100%' }}>
          <Button type='submit' disabled={!userForm.isDirty() || loading}>
            수정 완료
          </Button>
        </Stack>
      </Box>
    </Layout>
  )
}
