import { api } from '.'

import { ProductCatalogue } from '@/atoms'

export const getProductCatalogue = async (): Promise<ProductCatalogue[]> =>
  api
    .get('product-catalogue')
    .then((r) => r.data.Data)
    // eslint-disable-next-line no-console
    .catch((e) => console.log(e.message))
