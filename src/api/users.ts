import { http } from '~/utils/http'
import { AxiosError } from 'axios'
const apiGetUserInfo = async ({ token }: { token: string | null }) => {
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    console.log(config)
    const response = await http.get('/users/info', config)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data // Trả về dữ liệu lỗi từ server (nếu có)
    }
    return (error as Error).message // Tránh lỗi undefined
  }
}

export { apiGetUserInfo }
