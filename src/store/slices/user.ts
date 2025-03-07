// cái này xài mấy cái biến global khác
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userData: object | null
  accessToken: string | null
  isLoggedIn: boolean
  //   isLoading: false
  //   isAdmin: false
  //   isError: false
}
const initialState: UserState = {
  userData: null,
  accessToken: null,
  isLoggedIn: false
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ accessToken: string; userData: object }>) {
      state.accessToken = action.payload.accessToken
      state.userData = action.payload.userData
      state.isLoggedIn = true
    },
    logout(state) {
      state.accessToken = null
      state.userData = null
      state.isLoggedIn = false
    }
  }
})
const userReducer = userSlice.reducer
const userActions = userSlice.actions
export { userReducer, userActions }
