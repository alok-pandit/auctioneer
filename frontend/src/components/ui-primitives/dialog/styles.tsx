import * as Dialog from '@radix-ui/react-dialog'
import type {
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogTitleProps
} from '@radix-ui/react-dialog'
import { forwardRef } from 'react'
import { w } from 'windstitch'

import { textGradient } from '@/app/styles'
import { clmx } from '@/utils'

export enum closeBtnPosition {
  topLeft,
  topRight,
  bottomLeft,
  bottomRight
}
export const overlayCls = clmx(
  'fixed inset-0',
  'backdrop-blur-xl',
  'data-[state=open]:animate-overlayShow'
)

export const contentCls = clmx(
  'data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[60vw] max-w-screen translate-x-[-50%] translate-y-[-50%] rounded-[6px] backdrop-blur-sm dark:bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] dark:from-gray-900 dark:to-gray-600 bg-white/50 shadow-lg shadow-blue-400 p-[25px] dark:shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-auto'
)

export const titleCls = clmx(
  'text-white underline leading-normal m-0 text-xl font-bold text-center',
  `${textGradient}`
)

export const descriptionCls = clmx(
  'text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal'
)

export const closeBtnCls = clmx(
  'text-violet11 bg-violet4 focus:shadow-violet7 absolute',
  `dark:text-gray-300`,
  'inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full hover:shadow-[0_0_0_2px] focus:outline-none duration-500 hover:cursor-pointer hover:scale-125'
)

const o1 = (props: DialogOverlayProps) => <Dialog.Overlay {...props} />

const o2 = w(o1, { className: overlayCls })

export const DialogOverlay = forwardRef(o2)

const c1 = (props: DialogContentProps) => <Dialog.Content {...props} />

const c2 = w(c1, { className: contentCls })

export const DialogContent = forwardRef(c2)

const t1 = (props: DialogTitleProps) => <Dialog.Title {...props} />

const t2 = w(t1, { className: titleCls })

export const DialogTitle = forwardRef(t2)

const d1 = (props: DialogDescriptionProps) => <Dialog.Description {...props} />

const d2 = w(d1, { className: descriptionCls })

export const DialogDescription = forwardRef(d2)

export const CloseBtn = w.button(closeBtnCls, {
  variants: {
    pos: (pos: closeBtnPosition) => {
      switch (pos) {
        case closeBtnPosition.topLeft:
          return 'top-[10px] left-[10px] hover:rotate-180'
        case closeBtnPosition.bottomLeft:
          return 'bottom-[10px] left-[10px] hover:rotate-180'
        case closeBtnPosition.bottomRight:
          return 'bottom-[10px] right-[10px] hover:-rotate-180'
        default:
          return 'top-[10px] right-[10px] hover:-rotate-180'
      }
    },
    cursor: (c: boolean) => (c ? 'cursor-pointer' : 'cursor-auto')
  },
  defaultVariants: {
    pos: closeBtnPosition.topRight,
    cursor: true
  }
})

export const Div = w.div(
  clmx('mt-[25px] flex justify-end static z-30 w-full bottom-0')
)
