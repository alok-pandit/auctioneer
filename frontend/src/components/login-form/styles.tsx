import { w } from 'windstitch'

import { clmx } from '@/utils'

const textInputCls = clmx(
  'box-border w-full bg-white dark:bg-slate-700 shadow-black inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none dark:text-white text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-black'
)

export const TextInput = w.input(textInputCls)
