import { Grid, Typography } from '@material-ui/core'
import CartList from '../component/cart/CartList.component'
import CartSummary from '../component/cart/CartSummary.component'

export function Cart() {
    return (
        <Grid container spacing={ 4 }>
            <Grid item xs={ 8 }>
                <Typography variant="h3">Cart</Typography>
                <CartList />
            </Grid>
            <Grid item xs={ 4 }>
                <CartSummary />
            </Grid>
        </Grid>
    )
}

export default Cart
