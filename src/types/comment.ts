type User = {
  _id: string
  firstName: string
  lastName: string
  avatar?: {
    url: string
  }
}

type CommentType = {
  replies: CommentType[] | undefined
  _id: string
  user: User
  content: string
  createdAt: string
  likes: string[]
  rating?: number
  replyOnUser?: User
}
type AffectedCommentType = {
  type: 'REPLY' | 'EDIT'
  id: string
} | null
type CommentProps = {
  userId: string
  comment: CommentType
  isAdmin: boolean
  replies?: CommentType[]
  parentId?: string
  affectedComment?: AffectedCommentType
  setAffectedComment: (data: AffectedCommentType) => void
  handleSubmitComment: (data: { content: string; rating?: number; parentId?: string; replyOnUser?: string }) => void
  handleUpdateComment: (data: { commentId: string; content: string }) => void
  handleDeleteComment: (data: { commentId: string }) => void
}

type CommentFormProps = {
  initValue?: string // Giá trị khởi tạo của textarea (optional)
  cancelHandler?: () => void // Hàm xử lý khi nhấn nút Cancel (optional)
  confirmText: string // Văn bản hiển thị trên nút Confirm (required)
  handleSubmitComment: (content: string, rating: number) => void // Hàm xử lý khi nhấn nút Confirm (required)
  setAffectedComment?: (comment: null) => void // Hàm để đặt lại affectedComment (optional)
}

export type { AffectedCommentType, CommentType, CommentProps, CommentFormProps }
