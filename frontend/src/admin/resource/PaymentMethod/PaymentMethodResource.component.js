import PaymentMethodIcon from '@material-ui/icons/Payment'
import PaymentMethodList from './PaymentMethodList.component'
import PaymentMethodCreate from './PaymentMethodCreate.component'
import PaymentMethodEdit from './PaymentMethodEdit.component'

export const PaymentMethodResource = {
    name: 'PaymentMethod',
    icon: PaymentMethodIcon,
    list: PaymentMethodList,
    create: PaymentMethodCreate,
    edit: PaymentMethodEdit
}

export default PaymentMethodResource
