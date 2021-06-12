import { GetCustomerAddress } from '../../query/Address.query'
import AddressForm from './AddressForm.component'

export function AddressEdit(props) {
    const { id } = props
    const address = GetCustomerAddress({ id })

    if (!address) {
        return null
    }

    return (
        <AddressForm mode="edit" address={ address } />
    )
}

export default AddressEdit
