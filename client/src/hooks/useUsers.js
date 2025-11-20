import { useQuery } from '@tanstack/react-query'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('http://localhost:4000/api/users')
      return res.json()
    },
  })
}
