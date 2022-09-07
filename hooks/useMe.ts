import { useRouter } from 'next/router'
import { useGetMyProfileQuery } from '../lib/graphql/__generated__'

export default function useMe() {
  const { data, loading, error } = useGetMyProfileQuery()
  if (!data?.getMyProfile.ok || error) {
    console.error(data?.getMyProfile.error)
  }
  return { data, loading, error }
}
