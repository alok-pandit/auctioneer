import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@radix-ui/react-form'
import * as Separator from '@radix-ui/react-separator'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import * as z from 'zod'

import PasswordFormField from '../login-form/password-form-field'
import UsernameFormField from '../login-form/username-form-field'

import { login } from '@/apis/login'

const formSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4)
})
const defaultValues = {
  username: '',
  password: ''
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const SignUpForm = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const _queryClient = useQueryClient()

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await _queryClient.fetchQuery({
      queryKey: 'login',
      queryFn: () => login(values)
    })
    if (result) {
      methods.reset()
      router.replace('/dashboard')
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form.Root
          onSubmit={(e) => {
            e.preventDefault()
            methods.handleSubmit(onSubmit)()
          }}
        >
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.span variants={item}>
              <Separator.Root className="bg-white dark:bg-slate-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
            </motion.span>
            <motion.span variants={item}>
              <UsernameFormField />
            </motion.span>
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>{' '}
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>
            <motion.span variants={item}>
              <PasswordFormField />
            </motion.span>
          </motion.div>
        </Form.Root>
      </FormProvider>
    </>
  )
}

export default SignUpForm
