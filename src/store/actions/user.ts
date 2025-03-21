import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetUserInfo } from '~/api/users'

interface FetchUserParams {
  token: string | null
}

interface UserResponse {
  code: number
  data?: any // Thay thế `any` bằng kiểu dữ liệu chính xác của user
  message?: string
}

export const fetchCurrentUser = createAsyncThunk<UserResponse['data'], FetchUserParams>(
  'current-user/getUser',
  async ({ token }, { rejectWithValue }) => {
    const response: UserResponse = await apiGetUserInfo({ token })
    if (response?.code != 200) return rejectWithValue(response)
    return response.data
  }
)
