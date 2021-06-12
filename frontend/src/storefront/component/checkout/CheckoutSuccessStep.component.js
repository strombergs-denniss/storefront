import { Button, Grid, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { SubmitOrder } from '../../query/Checkout.query'

export function CheckoutSuccessStep() {
    const { address, shippingMethodId, paymentMethodId } = useSelector((state) => state.CheckoutReducer)
    const reference = SubmitOrder({
        addressId: address.id,
        shippingMethodId,
        paymentMethodId
    })

    if (!reference) {
        return null
    }

    return (
        <Grid container spacing={ 4 }>
            <Grid item xs={ 12 }>
                <Typography variant="h4">You have successfully complete the order.</Typography>
                <Typography>Order reference: { reference }</Typography>
                <Button href="/" variant="contained" color="primary">
                    Continue shopping
                </Button>
            </Grid>
        </Grid>
    )
}

export default CheckoutSuccessStep
