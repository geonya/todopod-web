import { Center, Text } from '@mantine/core'
import { IconCheckbox } from '@tabler/icons'
import { useRouter } from 'next/router'
import metaData from '../data/metaData'

export default function AppTitle() {
  const router = useRouter()
  return (
    <Center py={10} onClick={() => router.push('/')} sx={{ cursor: 'pointer' }}>
      <IconCheckbox size={18} />
      <Text>{metaData.siteTitle}</Text>
    </Center>
  )
}
