import { atom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'
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

export interface ProductCatalogue {
  batchId: string
  category: string
  description?: string
  discount?: number
  images: string[]
  price: number
  productName: string
  quantity: number
  sellerId: string
  unitPrice: number
  updatedAt?: string
}

export const fpAtom = atomWithImmer<ProductCatalogue[]>([])
