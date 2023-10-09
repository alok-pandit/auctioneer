import * as Form from '@radix-ui/react-form'
import { useFormContext } from 'react-hook-form'

import { TextInput } from './styles'

import { textGradient } from '@/app/styles'
import { clmx } from '@/utils'

const PasswordFormField = () => {
  const { register } = useFormContext()
  return (
    <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label
          className={clmx(
            'text-[15px] font-medium leading-[35px] text-white',
            `${textGradient}`
          )}
        >
          Password:
        </Form.Label>

        <Form.Message
          className="text-[13px] text-white dark:text-black opacity-[0.8]"
          match="valueMissing"
        >
          Please enter your password
        </Form.Message>
      </div>

      <Form.Control asChild>
        <TextInput
          type="password"
          // pattern={
          //   '/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/'
          // }
          required
          {...register('password')}
        />
      </Form.Control>
      {/* <Form.Message
        className="text-[13px] text-white dark:text-black opacity-[0.8] break-words"
        match="patternMismatch"
      >
        Please provide a valid Password! Your password should have at least one
        lowercase letter, <br />
        one uppercase letter, one digit, one special character, and is at least
        eight characters long.
      </Form.Message> */}
    </Form.Field>
  )
}

export default PasswordFormField
