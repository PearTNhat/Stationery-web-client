import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { apiGetAllProducts } from '~/api/product'
import ProductSection from '~/components/productSection/ProductSection'
import { showToastError } from '~/utils/alert'
import { Product } from '~/types/product'

const NewProduct = () => {
  const [products, setProducts] = useState<Product[]>([])
  const getNewProducts = async () => {
    try {
      const response = await apiGetAllProducts({
        page: 0,
        limit: 10,
        sortBy: 'createdAt'
      })
      if (response.code == 200) {
        setProducts(response.result.content)
      } else {
        showToastError(response.message || response.error)
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        showToastError(error.message)
      }
    }
  }

  useEffect(() => {
    getNewProducts()
  }, [])

  return <ProductSection title='New Products' products={products} />
}

export default NewProduct
