import { Typography, Grid } from '@material-ui/core'
import CartList from '../cart/CartList.component'
import CartTotals from '../cart/CartTotals.component'

export function CheckoutSummary() {
    return (
        <Grid container spacing={ 4 }>
            <Grid item xs={ 12 }>
                <Typography variant="h3">
                    Summary
                </Typography>
            </Grid>
            <Grid item xs={ 12 }>
                <CartList shouldRenderCartItemActions={ false } />
            </Grid>
            <Grid item xs={ 12 }>
                <CartTotals />
            </Grid>
        </Grid>
    )
}

export default CheckoutSummary
