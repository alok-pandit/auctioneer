import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query'

import { getProductCatalogue } from '@/apis/product-catalogue'
import ProductsContainer from '@/components/products-catalogue/products-container'

const Dashboard = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProductCatalogue
  })

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsContainer />
    </HydrationBoundary>
  )
}

export default Dashboard
