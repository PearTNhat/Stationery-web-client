import { AxiosError } from 'axios'
import { http } from '~/utils/http'

interface CreateOrderParams {
  orderDetails: {
    productDetailId: string
    quantity: number
  }[]
  userPromotionId?: string
  accessToken: string
}

export const apiCreateOrder = async ({
  orderDetails,
  userPromotionId,
  accessToken
}: CreateOrderParams): Promise<any> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }

    const body: any = {
      orderDetails
    }

    if (userPromotionId) {
      body.userPromotionId = userPromotionId
    }

    const response = await http.post('/purchase-orders', body, config)
    console.log('Order Response:', response.data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data
    }
    return (error as Error).message
  }
}
