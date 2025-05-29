import { http } from '~/utils/http'
import { AxiosError } from 'axios'

const apiGetAllColors = async () => {
  try {
    const response = await http.get('/colors')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data // Return server error response if available
    }
    return (error as Error).message // Avoid undefined error
  }
}
export { apiGetAllColors }
