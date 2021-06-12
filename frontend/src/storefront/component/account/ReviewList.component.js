import { Grid } from '@material-ui/core'
import { GetAllCustomerReviews } from '../../query/Review.query'
import ReviewItem from './ReviewItem.component'

export function ReviewList() {
    const reviews = GetAllCustomerReviews()

    if (!reviews) {
        return null
    }

    const renderReviewItem = (review) => {
        return (
            <ReviewItem review={ review } />
        )
    }

    return (
        <Grid
            container
            direction="row"
            justify="start"
            alignItems="center"
            spacing={ 4 }
        >
            { reviews.map(renderReviewItem) }
        </Grid>
    )
}

export default ReviewList
