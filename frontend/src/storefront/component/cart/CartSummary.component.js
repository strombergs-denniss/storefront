import { Button, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import CartTotals from './CartTotals.component'

export function CartSummary() {
    const { items } = useSelector((state) => state.CartReducer)

    const renderProceedToCheckoutButton = () => {
        if (!Object.keys(items).length) {
            return null
        }
        
        return (
            <Button variant="contained" color="primary" href="/checkout">Proceed to checkout</Button>
        )
    }

    return (
        <div>
            <Typography variant="h3">
                Summary
            </Typography>
            <CartTotals />
            { renderProceedToCheckoutButton() }
        </div>
    )
}

export default CartSummary
