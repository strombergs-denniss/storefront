import React from 'react'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { Box, Button, Grid } from '@material-ui/core'
import CartList from './CartList.component'
import CartTotals from './CartTotals.component'

export function CartOverlay() {
    return (
        <PopupState variant="popover" popupId="cart-overlay">
            {(popupState) => (
                <div>
                    <IconButton { ...bindTrigger(popupState) } aria-label="cart" color="inherit">
                        <ShoppingCartIcon />
                    </IconButton>
                    <Popover
                        { ...bindPopover(popupState) }
                        anchorReference="anchorPosition"
                        anchorPosition={ { top: 0, left: window.innerWidth } }
                        marginThreshold={ 0 }
                        PaperProps={ { style: { width: '500px', height: '100%', maxHeight: 'none' } } }
                    >
                        <Box padding={ 2 }>
                            <Grid container spacing={ 4 }>
                                <Grid item xs={ 12 }>
                                    <Typography variant="h4">Cart</Typography>
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <CartList />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <CartTotals />
                                </Grid>
                                <Grid item xs={ 12 }>
                                    <Button variant="contained" color="primary" href="/cart">Go to cart</Button>
                                    <Button variant="contained" color="primary" href="/checkout">Go to checkout</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    )
}

export default CartOverlay
