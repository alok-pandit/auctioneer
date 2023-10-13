'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import * as Separator from '@radix-ui/react-separator'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as z from 'zod'

import SignUpForm from '../signup-form'
import Button from '../ui-primitives/button'
import PopupDialog from '../ui-primitives/dialog'
import ToggleSwitch from '../ui-primitives/toggle-switch'

import PasswordFormField from './password-form-field'
import UsernameFormField from './username-form-field'

import { login } from '@/apis/login'
import { textGradient } from '@/app/styles'
import useDarkMode from '@/hooks/dark-mode'
import { clmx } from '@/utils'

const formSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4)
})
const defaultValues = {
  username: '',
  password: ''
}
const LoginForm = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const queryClient = useQueryClient()

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await queryClient.fetchQuery({
      queryKey: 'login',
      queryFn: () => login(values)
    })
    if (result) {
      methods.reset()
      router.replace('/dashboard')
    }
  }

  const { isDark, setIsDark } = useDarkMode()

  return (
    <>
      <FormProvider {...methods}>
        <Form.Root
          className={clmx(
            'p-6 rounded-xl shadow-lg backdrop-blur-sm shadow-blue-400',
            'glass z-20',
            'dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]',
            'dark:from-gray-900 dark:to-gray-600'
          )}
          onSubmit={(e) => {
            e.preventDefault()
            methods.handleSubmit(onSubmit)()
          }}
        >
          <div className="flex justify-between">
            <h1 className={clmx(`text-xl text-center ${textGradient}`)}>
              Login
            </h1>
            <ToggleSwitch
              label="Dark Mode:"
              onChange={setIsDark}
              checked={isDark}
            />
          </div>
          <Separator.Root className="bg-white dark:bg-slate-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
          <UsernameFormField />
          <PasswordFormField />
          <div className="flex justify-center gap-16 mt-6">
            <Button title="Login" type="submit" />
            <PopupDialog
              dialogTriggerText={'Sign Up'}
              dialogTitleText={'Sign Up'}
            >
              <SignUpForm />
            </PopupDialog>
          </div>
        </Form.Root>
      </FormProvider>
    </>
  )
}

export default LoginForm
