'use client'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

import { getProductCatalogue } from '@/apis/product-catalogue'
import { ProductCatalogue } from '@/atoms'

const ProductsContainer = () => {
  const { data: prods } = useQuery({
    queryKey: ['products'],
    queryFn: getProductCatalogue,
    staleTime: 10 * 60 * 1000
  })

  return (
    <div>
      <Suspense fallback={<h1>Loading...</h1>}>
        {prods &&
          prods.length &&
          prods.map((p: ProductCatalogue, i: number) => {
            return (
              <div key={i}>
                <div>{p.batchId}</div>
                <hr></hr>
              </div>
            )
          })}
      </Suspense>
    </div>
  )
}

export default ProductsContainer
