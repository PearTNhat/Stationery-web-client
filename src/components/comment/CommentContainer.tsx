import { useSelector, useDispatch } from 'react-redux'
import VoteBar from './VoteBar'
import RatingModal from './RatingModal'
import { memo, useCallback, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Comment from './Comment'
import YourRating from './YourRating'
import { AffectedCommentType, CommentType } from '~/types/comment'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { modalActions } from '~/store/slices/modal'
import { Review } from '~/types/review'

interface CommentContainerProps {
  pId: string
  comments?: Review[]
  totalRating: number
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentContainer: React.FC<CommentContainerProps> = ({ pId, comments, totalRating, setFetchAgain }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userData } = useAppSelector((state) => state.user)
  const [affectedComment, setAffectedComment] = useState<AffectedCommentType>(null)
  const [rated, setRated] = useState<CommentType | null>(null)

  const handleSubmitComment = async ({
    rating,
    content,
    parentId,
    replyOnUser
  }: {
    rating?: number
    content: string
    parentId?: string
    replyOnUser?: string
  }) => {
    if (content.trim() === '') {
      Swal.fire({
        title: 'Comment is required',
        icon: 'info',
        confirmButtonColor: '#ee3131'
      })
      return
    }
  }

  const handleUpdateComment = async ({
    commentId,
    content,
    rating
  }: {
    commentId: string
    content: string
    rating?: number
  }) => {}

  const handleDeleteComment = async (data: { commentId: string }) => {}

  useEffect(() => {}, [comments])
  const handleRatingModal = () => {
    dispatch(
      modalActions.toggleModal({
        isOpenModal: true,
        childrenModal: <RatingModal title='hi' handleSubmitComment={handleSubmitComment} />
      })
    )
  }

  return (
    <div>
      <VoteBar totalRating={totalRating} comments={comments} />
      {rated ? (
        <YourRating
          comment={rated}
          handleShowModalUpdateRating={() =>
            handleUpdateComment({
              rating: rated.rating,
              content: rated.content,
              commentId: rated._id
            })
          }
          handleDeleteComment={handleDeleteComment}
        />
      ) : (
        <div className='flex justify-center'>
          <button className='d-btn d-btn-primary' onClick={handleRatingModal}>
            Đánh giá ngay
          </button>
        </div>
      )}
      {comments?.map((comment) => (
        <Comment
          key={comment.reviewId}
          userId={userData?.userId}
          comment={comment}
          isAdmin={false}
          affectedComment={affectedComment}
          setAffectedComment={setAffectedComment}
          handleSubmitComment={handleSubmitComment}
          handleUpdateComment={handleUpdateComment}
          handleDeleteComment={handleDeleteComment}
          replies={comment.replies}
        />
      ))}
    </div>
  )
}

export default memo(CommentContainer)
