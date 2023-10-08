'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import * as Separator from '@radix-ui/react-separator'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

import Button from '../ui-primitives/button'
import ToggleSwitch from '../ui-primitives/toggle-switch'

import EmailFormField from './email-form-field'
import PasswordFormField from './password-form-field'

import useDarkMode from '@/hooks/dark-mode'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const LoginForm = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line
    console.log(values)
    methods.reset()
  }

  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <FormProvider {...methods}>
      <Form.Root
        className="p-6 rounded-lg shadow-lg backdrop-blur-sm shadow-blue-400 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-gray-300 to-gray-900"
        onSubmit={(e) => {
          e.preventDefault()
          methods.handleSubmit(onSubmit)()
        }}
      >
        <div className="flex justify-between">
          <h1 className="text-xl text-center text-white dark:text-black">
            Login
          </h1>
          <ToggleSwitch onChange={toggleDarkMode} checked={isDark} />
        </div>
        <Separator.Root className="bg-white dark:bg-slate-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
        <EmailFormField />
        <PasswordFormField />
        <Button className="self-center" title="Login" type="submit" />
      </Form.Root>
    </FormProvider>
  )
}

export default LoginForm
