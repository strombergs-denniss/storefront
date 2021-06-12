import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { CartItem } from './CartItem.component'

export function CartList(props) {
    const { shouldRenderCartItemActions } = props
    const { items } = useSelector((state) => state.CartReducer)

    const renderCartItem = (item) => {
        return (
            <CartItem item={ item } shouldRenderCartItemActions={ shouldRenderCartItemActions } />
        )
    }

    if (!Object.keys(items).length) {
        return (
            <Typography>Empty cart!</Typography>
        )
    }

    return (
        <Grid container spacing={ 2 }>
            { Object.values(items).map(renderCartItem) }
        </Grid>
    )
}

export default CartList
