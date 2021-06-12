import { Button, Grid } from '@material-ui/core'
import { GetAllCustomerAddresses } from '../../query/Address.query'
import AddressItem from './AddressItem.component'

export function AddressList() {
    const addresses = GetAllCustomerAddresses()

    if (!addresses) {
        return null
    }

    const renderAddressItem = (address) => {
        return (
            <AddressItem address={ address } />
        )
    }

    return (
        <>
            <Button variant="contained" color="primary" href="/account/addresses/create">
                Create
            </Button>
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

export default AddressList
