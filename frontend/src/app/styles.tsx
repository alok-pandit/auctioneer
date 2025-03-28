import { ReactNode } from 'react'

import { Div1, Div2 } from '@/components/ui-primitives/button/styles'
import useDarkMode from '@/hooks/dark-mode'
import { clmx } from '@/utils'

export const textGradient = clmx(
  'bg-gradient-to-r from-black dark:from-gray-300 to-gray-500',
  'dark:to-gray-400 bg-clip-text text-transparent'
)

export const FunkyBackground = (props: { children: ReactNode }) => {
  const { isDark } = useDarkMode()

  return isDark ? (
    <Div1>
      <Div2 />
      {props.children}
    </Div1>
  ) : (
    <>{props.children}</>
  )
}
