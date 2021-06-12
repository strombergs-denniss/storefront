import CustomerIcon from '@material-ui/icons/AccessibleForward'
import CustomerList from './CustomerList.component'
import CustomerCreate from './CustomerCreate.component'
import CustomerEdit from './CustomerEdit.component'

export const CustomerResource = {
    name: 'Customer',
    icon: CustomerIcon,
    list: CustomerList,
    create: CustomerCreate,
    edit: CustomerEdit
}

export default CustomerResource
