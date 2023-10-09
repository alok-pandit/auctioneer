import { atom } from 'jotai'

export const darkAtomBase = atom(false)

export const darkAtom = atom(
  (get) => get(darkAtomBase),
  (_get, set, isDark: boolean) => {
    set(darkAtomBase, isDark)
    if (isDark) {
      document?.documentElement?.classList?.add('dark')
    } else {
      document?.documentElement?.classList?.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }
)
