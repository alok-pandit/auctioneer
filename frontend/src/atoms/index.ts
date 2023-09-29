import { atomWithImmer } from 'jotai-immer'

import { ILoginCredentials } from '@/types'

export const loginCredentialsAtom = atomWithImmer<ILoginCredentials>({
  username: '',
  password: ''
})
