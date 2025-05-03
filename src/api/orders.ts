import { AxiosError } from 'axios'
import { CreateOrderParams } from '~/types/order'
import { http } from '~/utils/http'
//  ddang lam info
export const apiCreateOrderWithPayment = async ({
  orderDetails,
  userPromotionId,
  addressId,
  recipient,
  amount,
  note,
  accessToken
}: CreateOrderParams) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    const body = {
      orderDetails,
      userPromotionId,
      addressId,
      amount,
      note,
      recipient
    }
    const response = await http.post('/purchase-orders/payment-momo', body, config)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data
    }
    return (error as Error).message
  }
}
