import { http } from '~/utils/http'
import { AxiosError } from 'axios'
const apiLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await http.post('/auth/login', { email, password })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data // Trả về dữ liệu lỗi từ server (nếu có)
    }
    return (error as Error).message // Tránh lỗi undefined
  }
}

export { apiLogin }
