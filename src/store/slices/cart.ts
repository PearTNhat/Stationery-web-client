// cái này xài mấy cái biến global khác
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '~/types/cart'
import { fetchMyCart } from '../actions/cart'

interface CartState {
  myCart: CartItem[]
  isLoading: boolean
  isError: boolean
}

const initialState: CartState = {
  myCart: [],
  isLoading: false,
  isError: false
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyCart.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchMyCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.isLoading = false
      state.isError = false
      state.myCart = action.payload
    })
    builder.addCase(fetchMyCart.rejected, (state) => {
      state.isLoading = false
      state.isError = true
      state.myCart = []
    })
  }
})
const cartReducer = cartSlice.reducer
const cartActions = cartSlice.actions
export { cartReducer, cartActions }
