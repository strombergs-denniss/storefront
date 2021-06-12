import { Grid, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { GetAllProductReviews } from '../../query/Review.query'
import ReviewForm from '../account/ReviewForm.component'
import moment from 'moment'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function renderProductReview(review) {
    const { date, title, content, customer: { firstName, lastName }, rating } = review

    return (
        <Grid item xs={ 12 }>
            <Grid container spacing={ 1 }>
                <Grid item xs={ 12 }>
                    <Typography variant="body">
                        { moment(date).format('MMMM Do YYYY, h:mm:ss a') }
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography>
                        { `${ firstName } ${ lastName }` }
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography variant="h5">
                        { title }
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography>
                        { content }
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <Rating disabled value={ rating } max={ 10 } />
                </Grid>
            </Grid>
        </Grid>
    )
}

export function ProductReviews(props) {
    const { product: { id } } = props
    const reviews = GetAllProductReviews({ productId: id })
    const [postedReview, setPostedReview] = useState(null)
    const account = useSelector((state) => state.AccountReducer)

    if (!reviews) {
        return null
    }

    const renderForm = () => {
        if (!account?.token) {
            return null
        }

        return (
            <>
                <Grid item xs={ 12 }>
                    <Typography variant="h5">Write a review:</Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <ReviewForm mode="create" productId={ id } setPostedReview={ setPostedReview } />
                </Grid>
            </>
        )
    }

    return (
        <Grid container spacing={ 2 }>
            { renderForm() }
            <Grid item xs={ 12 }>
                <Grid container spacing={ 4 }>
                    { postedReview ? [postedReview, ...reviews].map(renderProductReview)  : reviews.map(renderProductReview) }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductReviews
