import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { login } from '@/apis'

const LoginForm = () => {
  const { data, refetch } = useQuery('login', () => login('alok', 'alok'))
  useEffect(() => {
    // eslint-disable-next-line
    console.log(data)
  }, [data])
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly">
      <div className="mx-auto max-w-md">
        <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
          <div className="grid h-full w-12 place-items-center text-gray-600 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          <input
            className="peer inline-flex h-full w-full appearance-none px-2 text-[15px] leading-none text-gray-700 outline-none"
            type="text"
            placeholder="Username"
          />
        </div>
      </div>

      <div className="mx-auto max-w-md">
        <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
          <div className="grid h-full w-12 place-items-center text-gray-600 shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
            </svg>
          </div>

          <input
            className="peer inline-flex h-full w-full appearance-none px-2 text-[15px] leading-none text-gray-700 outline-none"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      {/* <input
        className="inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-lg bg-black px-[10px] text-[15px] leading-none text-white shadow-lg shadow-black outline-none  focus:shadow-[0_0_0_2px_black]"
        placeholder="Password"
        type={'password'}
      /> */}
      <div className="ml-2 flex flex-row items-center justify-center">
        <button
          onClick={() => refetch()}
          className="btn group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 px-10 py-4 font-mono font-medium tracking-tighter text-white "
        >
          <span className="absolute h-0 w-0 rounded-full bg-gray-900 transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
          <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-400 opacity-30"></span>
          <span className="relative">Login</span>
        </button>
        <span className="mx-2">Or</span>
        <button className="btn activate:scale-75 group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 px-10 py-4 font-mono font-medium tracking-tighter text-white">
          <span className="absolute h-0 w-0 rounded-full bg-gray-900 transition-all duration-500 ease-out group-hover:h-56 group-hover:w-56"></span>
          <span className="absolute inset-0 -mt-1 h-full w-full rounded-lg bg-gradient-to-b from-transparent via-transparent to-gray-400 opacity-30"></span>
          <span className="relative">Sign Up</span>
        </button>
      </div>
    </div>
  )
}

export default LoginForm
