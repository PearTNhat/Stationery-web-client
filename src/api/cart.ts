import { AxiosError } from 'axios'
import { CartItem } from '~/types/cart'
import { http } from '~/utils/http'

export const apiGetCartItems = async (accessToken: string): Promise<CartItem[] | string> => {
  try {
    const config = { headers: { Authorization: `Bearer ${accessToken}` } }
    const res = await http.get('/carts', config)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data
    }
    return (error as Error).message
  }
}

export const apiAddItemToCart = async ({
  productId,
  quantity,
  accessToken
}: {
  productId: string
  quantity: number
  accessToken: string
}): Promise<CartItem | string> => {
  try {
    const config = { headers: { Authorization: `Bearer ${accessToken}` } }
    const body = { productId, quantity }
    const response = await http.post('/carts', body, config)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data
    }
    return (error as Error).message
  }
}

export const apiUpdateCartItem = async ({
  productDetailId,
  quantity,
  colorId,
  sizeId,
  accessToken
}: {
  productDetailId: string
  quantity: number
  colorId?: string
  sizeId?: string
  accessToken: string
}): Promise<CartItem | string> => {
  try {
    const config = { headers: { Authorization: `Bearer ${accessToken}` } }
    const body = { quantity, colorId, sizeId }
    const res = await http.put(`/carts/${productDetailId}`, body, config)
    return res.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data
    }
    return (error as Error).message
  }
}

export const apiRemoveCartItem = async ({
  productDetailId,
  accessToken
}: {
  productDetailId: string
  accessToken: string
}): Promise<string> => {
  try {
    const config = { headers: { Authorization: `Bearer ${accessToken}` } }
    await http.delete(`/carts/${productDetailId}`, config)
    return 'Item deleted successfully'
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data
    }
    return (error as Error).message
  }
}
