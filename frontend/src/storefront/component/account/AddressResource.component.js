import AddressCreate from './AddressCreate.component'
import AddressEdit from './AddressEdit.component'
import AddressList from './AddressList.component'

export function AddressResource(props) {
    const { action, id } = props

    switch (action) {
        case 'create':
            return (
                <AddressCreate />
            )
        case 'edit':
            return (
                <AddressEdit id={ id } />
            )
        default:
            return (
                <AddressList />
            )
    }
}

export default AddressResource
