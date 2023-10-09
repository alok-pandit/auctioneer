'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import * as Separator from '@radix-ui/react-separator'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import Button from '../ui-primitives/button'
import ToggleSwitch from '../ui-primitives/toggle-switch'

import PasswordFormField from './password-form-field'
import UsernameFormField from './username-form-field'

import useDarkMode from '@/hooks/dark-mode'
import { clmx } from '@/utils'

const formSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4)
})

const LoginForm = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line
    console.log(values)
    methods.reset()
  }

  const { isDark, setIsDark } = useDarkMode()

  return (
    <FormProvider {...methods}>
      <Form.Root
        className={clmx(
          'p-6 rounded-lg shadow-lg backdrop-blur-sm shadow-blue-400',
          'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))]',
          'from-gray-900 via-gray-300 to-gray-900',
          'dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]',
          'dark:from-gray-900 dark:to-gray-600'
        )}
        onSubmit={(e) => {
          e.preventDefault()
          methods.handleSubmit(onSubmit)()
        }}
      >
        <div className="flex justify-between">
          <h1 className={clmx('text-xl text-center text-white')}>Login</h1>
          <ToggleSwitch onChange={setIsDark} checked={isDark} />
        </div>
        <Separator.Root className="bg-white dark:bg-slate-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
        <UsernameFormField />
        <PasswordFormField />
        <div className="flex justify-center gap-16 mt-6">
          <Button title="Login" type="submit" />
          <Button title="SignUp" type="button" />
        </div>
      </Form.Root>
    </FormProvider>
  )
}

export default LoginForm
