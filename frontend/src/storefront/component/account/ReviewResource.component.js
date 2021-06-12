import ReviewEdit from './ReviewEdit.component'
import ReviewList from './ReviewList.component'

export function ReviewResource(props) {
    const { action, id } = props

    switch (action) {
        case 'edit':
            return (
                <ReviewEdit id={ id } />
            )
        default:
            return (
                <ReviewList />
            )
    }
}

export default ReviewResource
