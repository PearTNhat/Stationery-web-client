import { http } from '~/utils/http'
import { AxiosError } from 'axios'

const apiGetAllProducts = async ({
  page = 0,
  limit = 10,
  sortBy = 'createdAt',
  ascending = true,
  minPrice,
  maxPrice
}: {
  page?: number
  limit?: number
  sortBy?: string
  ascending?: boolean
  minPrice?: number
  maxPrice?: number
}) => {
  try {
    const params = {
      page,
      limit,
      sortBy,
      ascending,
      minPrice,
      maxPrice
    }
    const response = await http.get('/products', { params })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data // Return server error response if available
    }
    return error // Avoid undefined error
  }
}
const apiGetDetailProduct = async (slug: string | undefined) => {
  try {
    const response = await http.get('/products/' + slug)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data // Return server error response if available
    }
    return error // Avoid undefined error
  }
}

export { apiGetAllProducts, apiGetDetailProduct }
