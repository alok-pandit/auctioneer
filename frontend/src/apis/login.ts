import { api } from '.'

export interface ILoginAPIInputs {
  username: string
  password: string
}
export const login = async (creds: ILoginAPIInputs) =>
  api
    .post('login', creds)
    .then((r) => r.data)
    .catch((e) => alert(e.message))
