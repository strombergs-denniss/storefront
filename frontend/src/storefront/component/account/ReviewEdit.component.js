import { GetCustomerReview } from '../../query/Review.query'
import ReviewForm from './ReviewForm.component'

export function ReviewEdit(props) {
    const { id } = props
    const review = GetCustomerReview({ id })

    if (!review) {
        return null
    }

    return (
        <ReviewForm mode="edit" review={ review } />
    )
}

export default ReviewEdit
