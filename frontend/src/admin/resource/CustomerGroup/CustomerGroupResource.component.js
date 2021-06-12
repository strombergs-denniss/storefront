import CustomerGroupIcon from '@material-ui/icons/Group'
import CustomerGroupList from './CustomerGroupList.component'
import CustomerGroupCreate from './CustomerGroupCreate.component'
import CustomerGroupEdit from './CustomerGroupEdit.component'

export const CustomerGroupResource = {
    name: 'CustomerGroup',
    options: { label: 'Customer groups' },
    icon: CustomerGroupIcon,
    list: CustomerGroupList,
    create: CustomerGroupCreate,
    edit: CustomerGroupEdit
}

export default CustomerGroupResource
