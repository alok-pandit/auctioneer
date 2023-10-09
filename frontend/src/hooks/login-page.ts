import { useQuery } from 'react-query'

import { ILoginAPIInputs, login } from '@/apis/login'

export const useLoginQuery = (loginCreds: ILoginAPIInputs) => {
  return useQuery(['login', loginCreds], () => login(loginCreds), {
    enabled: Boolean(
      loginCreds.username.length > 0 && loginCreds.password.length > 0
    )
  })
}
