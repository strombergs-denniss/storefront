import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Box, Button, CardActions, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import moment from 'moment'

export function OrderItem(props) {
    const config = useSelector((state) => state.ConfigReducer)
    const { order, order: { id } } = props

    const fields = [
        {
            label: 'Reference',
            key: 'reference'
        },
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
            label: 'Total delivery',
            key: 'totalDelivery',
            endAdornment: config.currencySign
        },
        {
            label: 'Total tax',
            key: 'totalTax',
            endAdornment: config.currencySign
        },
        {
            label: 'Subtotal',
            key: 'subtotal',
            endAdornment: config.currencySign
        },
        {
            label: 'Total',
            key: 'total',
            endAdornment: config.currencySign
        }
    ]

    const renderField = (field) => {
        const { label, key, endAdornment = '', format = (value) => value } = field
        const { [key]: value } = order

        return (
            <Grid container justify="space-between">
                <Typography variant="body" component="dt">
                    { label }
                </Typography>
                <Typography variant="body" component="dd">
                    { `${ format(value) } ${ endAdornment }` }
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
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" href={ 'orders/edit/' + id }>View</Button>
                    </CardActions>
                </Card>
            </Box>
        </Grid>
    )
}

export default OrderItem
