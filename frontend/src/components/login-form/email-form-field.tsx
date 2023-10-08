import * as Form from '@radix-ui/react-form'
import { useFormContext } from 'react-hook-form'

import { TextInput } from './styles'

const EmailFormField = () => {
  const { register } = useFormContext()
  return (
    <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white dark:text-black">
          Email
        </Form.Label>

        <Form.Message
          className="text-[13px] text-white dark:text-black opacity-[0.8]"
          match="valueMissing"
        >
          Please enter your email
        </Form.Message>

        <Form.Message
          className="text-[13px] text-white dark:text-black opacity-[0.8]"
          match="typeMismatch"
        >
          Please provide a valid email
        </Form.Message>
      </div>

      <Form.Control asChild>
        <TextInput type="email" required {...register('email')} />
      </Form.Control>
    </Form.Field>
  )
}

export default EmailFormField
