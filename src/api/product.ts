import { http } from '~/utils/http'
import { AxiosError } from 'axios'

const apiGetAllProducts = async ({
  page = 0,
  limit = 10,
  sortBy = 'createdAt',
  ascending = true
}: {
  page?: number
  limit?: number
  sortBy?: string
  ascending?: boolean
}) => {
  try {
    const params = {
      page,
      limit,
      sortBy,
      ascending
    }
    const response = await http.get('/products', { params })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data // Return server error response if available
    }
    return (error as Error).message // Avoid undefined error
  }
}
export { apiGetAllProducts }
