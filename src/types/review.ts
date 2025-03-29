import { User } from './user'
interface Review {
  reviewId: string
  user: User
  content: string | null
  rating: number
  reviewImage: string | null
  childReviews: Review[]
  replyOnUser: User | null
  createdAt: string
}

export type { Review }
