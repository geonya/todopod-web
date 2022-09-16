import {
  Box,
  Button,
  Group,
  Menu,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconChevronDown, IconUser } from '@tabler/icons'
import { useEffect, useState } from 'react'
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
  const [opened, setOpened] = useState(false)
  const [selectedRole, setSelectedRole] = useState(UserRole['Client'])
  const { classes: roleClasses } = useRoleStyles({ opened })

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

  const [updateProfile, { loading }] = useEditAccountMutation()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])
  return (
    <Layout centered>
      <Box
        component='form'
        onSubmit={userForm.onSubmit(userFormOnSubmit)}
        sx={{ width: 300 }}
      >
        <TextInput
          {...userForm.getInputProps('name')}
          label='Name'
          placeholder={data?.getMyProfile.user.name}
        />
        <PasswordInput
          {...userForm.getInputProps('password')}
          label='Password'
        />
        <TextInput
          {...userForm.getInputProps('email')}
          label='E-Mail'
          placeholder={data?.getMyProfile.user.email}
        />
        <TextInput
          {...userForm.getInputProps('company')}
          label='Company'
          placeholder={data?.getMyProfile.user.company}
        />
        {!data?.getMyProfile.user.verified && (
          <Text color='red'>이메일 인증이 필요합니다.</Text>
        )}
        <Box mt={20}>
          <Menu
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
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
        <Stack mt={20}>
          <Button color='orange' onClick={emailVerify}>
            E-Mail 인증하기
          </Button>
          <Button type='submit' disabled={!userForm.isDirty() || loading}>
            수정 완료
          </Button>
        </Stack>
      </Box>
    </Layout>
  )
}
