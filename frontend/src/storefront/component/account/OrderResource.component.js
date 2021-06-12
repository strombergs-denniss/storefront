import OrderEdit from './OrderEdit.component'
import OrderList from './OrderList.component'

export function OrderResource(props) {
    const { action, id } = props

    switch (action) {
        case 'edit':
            return (
                <OrderEdit id={ id } />
            )
        default:
            return (
                <OrderList />
            )
    }
}

export default OrderResource
