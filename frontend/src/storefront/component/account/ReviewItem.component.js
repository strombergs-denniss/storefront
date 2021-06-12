import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Box, Button, CardActions, Grid, Link } from '@material-ui/core'
import moment from 'moment'

export function ReviewItem(props) {
    const { review, review: { id, product: { name, urlKey } } } = props

    const fields = [
        {
            label: 'Date',
            key: 'date',
            format: (value) => moment(value).format('DD.MM.yyyy')
        },
        {
            label: 'Status',
            key: 'status'
        },
        {
            label: 'Title',
            key: 'title'
        },
        {
            label: 'Content',
            key: 'content'
        },
        {
            label: 'Rating',
            key: 'rating'
        }
    ]

    const renderField = (field) => {
        const { label, key, format = (value) => value } = field
        const { [key]: value } = review

        return (
            <Grid container justify="space-between">
                <Typography variant="body" component="dt">
                    { label }
                </Typography>
                <Typography variant="body" component="dd">
                    { format(value) }
                </Typography>
            </Grid>
        )
    }

    const renderProduct = () => {
        return (
            <Grid container justify="space-between">
                <Typography variant="body" component="dt">
                    Product
                </Typography>
                <Typography variant="body" component="dd">
                    <Link href={ '/product/' + urlKey } color="inherit">
                        { name }
                    </Link>
                </Typography>
            </Grid>
        )
    }

    return (
        <Grid item xs={ 6 }>
            <Box>
                <Card>
                    <CardContent>
                        { fields.map(renderField) }
                        { renderProduct() }
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" href={ 'reviews/edit/' + id }>Edit</Button>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    )
}

export default ReviewItem
