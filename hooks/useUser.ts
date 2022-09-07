import { useGetMyProfileQuery } from '../lib/graphql/__generated__'

export default function useUser() {
  const { data, client } = useGetMyProfileQuery()
  return { data, client }
}
