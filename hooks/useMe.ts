import { useGetMyProfileQuery } from '../lib/graphql/__generated__'

export default function useMe() {
  const { data, loading, error } = useGetMyProfileQuery()
  return { data, loading, error }
}
