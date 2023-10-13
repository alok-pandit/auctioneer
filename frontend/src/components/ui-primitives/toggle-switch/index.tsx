import * as Switch from '@radix-ui/react-switch'
import { motion } from 'framer-motion'

import { FunkyBackground, textGradient } from '@/app/styles'
import { clmx } from '@/utils'

const ToggleSwitch = (props: {
  onChange: (c: boolean) => void
  checked: boolean
  label: string
}) => (
  <div className="flex items-center">
    <FunkyBackground>
      <label
        onClick={() => props.onChange(!props.checked)}
        className={clmx(
          `leading-none pr-[15px] z-50 cursor-pointer ${textGradient}`
        )}
        htmlFor="dark-mode"
      >
        {props.label}
      </label>
    </FunkyBackground>
    <Switch.Root
      checked={props.checked}
      onCheckedChange={(c) => props.onChange(c)}
      aria-label={'ToggleSwitch'}
      className={clmx(
        'w-[38px] h-[21px] bg-transparent rounded-full',
        'relative shadow-[0_2px_10px] shadow-black',
        'data-[state=checked]:bg-black',
        'outline-none cursor-default'
      )}
      id="dark-mode"
    >
      <motion.span layout>
        <Switch.Thumb
          id="dark-mode-thumb"
          className="block w-[17px] h-[17px] bg-white dark:bg-slate-700 rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
        />
      </motion.span>
    </Switch.Root>
  </div>
)

export default ToggleSwitch
