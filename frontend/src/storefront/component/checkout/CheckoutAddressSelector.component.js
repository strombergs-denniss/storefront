import { Grid, Typography } from '@material-ui/core'
import AddressItem from '../account/AddressItem.component'
import { AddressFormFields } from '../account/AddressForm.component'

export function CheckoutAddressSelector(props) {
    const { addressId, setAddressId, addresses } = props

    if (!addresses.length) {
        return (
            <>
                <Typography variant="h6">Enter your shipping information:</Typography>
                <AddressFormFields />
            </>
        )
    }

    const onClick = (val) => {
        const value = parseInt(val)
        
        if (addressId === value) {
            setAddressId(0)
        } else {
            setAddressId(parseInt(val))
        }
    }

    const renderAddressItem = (address) => {
        return (
            <AddressItem width={ 12 } addressId={ addressId } address={ address } shouldRenderActions={ false } onClick={ onClick } />
        )
    }

    return (
        <>
            <Typography variant="h6">Select address:</Typography>
            <Grid
                container
                direction="row"
                justify="start"
                alignItems="center"
                spacing={ 4 }
            >
                { addresses.map(renderAddressItem) }
            </Grid>
        </>
    )
}

export default CheckoutAddressSelector
