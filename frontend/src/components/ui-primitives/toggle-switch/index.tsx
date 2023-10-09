import * as Switch from '@radix-ui/react-switch'

import { clmx } from '@/utils'

const ToggleSwitch = (props: {
  onChange: (c: boolean) => void
  checked: boolean
}) => (
  <div className="flex items-center">
    <label
      className="text-white dark:text-black leading-none pr-[15px]"
      htmlFor="dark-mode"
    >
      Dark mode:
    </label>
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
      <Switch.Thumb
        id="dark-mode-thumb"
        className="block w-[17px] h-[17px] bg-white dark:bg-slate-700 rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
      />
    </Switch.Root>
  </div>
)

export default ToggleSwitch
