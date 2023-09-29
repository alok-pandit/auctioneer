import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const api = axios.create({
  baseURL
})

export const login = (username: string, password: string) => {
  api
    .post('login', { username, password })
    .then(({ data }) => data)
    .catch((e) => e)
}
