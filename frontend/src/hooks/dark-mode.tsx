'use client'

import { useEffect, useState } from 'react'

const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(false)

  const toggleDarkMode = (d: boolean) => {
    if (d) {
      document?.documentElement?.classList?.add('dark')
    } else {
      document?.documentElement?.classList?.remove('dark')
    }

    localStorage.theme = String(d ? 'dark' : 'light')

    setIsDark(d)
  }

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      toggleDarkMode(true)
    } else {
      toggleDarkMode(false)
    }
  }, [])

  return { isDark, toggleDarkMode }
}

export default useDarkMode
