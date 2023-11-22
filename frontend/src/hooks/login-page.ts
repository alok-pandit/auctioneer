import { useQuery } from '@tanstack/react-query'

import { ILoginAPIInputs, login } from '@/apis/login'

export const useLoginQuery = (loginCreds: ILoginAPIInputs) => {
  return useQuery({
    queryKey: ['login', loginCreds],
    queryFn: () => login(loginCreds),
    enabled: Boolean(
      loginCreds.username.length > 0 && loginCreds.password.length > 0
    )
  })
}
