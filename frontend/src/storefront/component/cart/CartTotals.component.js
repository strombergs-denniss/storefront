import { Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Price from '../product/Price.component'

export function CartTotals() {
    const { totals: { totalTax, subtotal, total } } = useSelector((state) => state.CartReducer)

    const totals = [
        {
            value: totalTax,
            label: 'Total tax'
        },
        {
            value: subtotal,
            label: 'Subtotal'
        },
        {
            value: total,
            label: 'Total'
        }
    ]

    const renderField = (field) => {
        const { value, label } = field

        return (
            <Grid item xs={ 12 }>
                <Grid container justify="space-between">
                    <Typography variant="body1" component="dt">
                        { label }
                    </Typography>
                    <Typography variant="body1" component="dd">
                        <Price value={ value } />
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={ 2 }>
            { totals.map(renderField) }
        </Grid>
    )
}

export default CartTotals
