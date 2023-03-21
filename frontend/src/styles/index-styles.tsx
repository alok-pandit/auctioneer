import { w } from 'windstitch'
import clsx from 'clsx'

export const Main = w.main(
  clsx(
    'flex items-center justify-center',
    'h-screen w-full',
    'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-300 to-slate-900'
  )
)

export const LoginContainer = w.div(
  clsx(
    'h-2/4 w-2/4',
    'bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200',
    'shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]',
    'rounded-lg'
  )
)
