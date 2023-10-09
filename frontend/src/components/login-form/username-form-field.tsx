import * as Form from '@radix-ui/react-form'
import { useFormContext } from 'react-hook-form'

import { TextInput } from './styles'

import { textGradient } from '@/app/styles'
import { clmx } from '@/utils'

const UsernameFormField = () => {
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
          Username:
        </Form.Label>

        <Form.Message
          className="text-[13px] text-white dark:text-black opacity-[0.8]"
          match="valueMissing"
        >
          Username is mandatory
        </Form.Message>
      </div>

      <Form.Control asChild>
        <TextInput type="text" required {...register('username')} />
      </Form.Control>
    </Form.Field>
  )
}

export default UsernameFormField
