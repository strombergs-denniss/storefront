import { Grid } from '@material-ui/core'
import { GetAllCustomerOrders } from '../../query/Order.query'
import OrderItem from './OrderItem.component'

export function OrderList() {
    const orders = GetAllCustomerOrders()

    if (!orders) {
        return null
    }

    const renderOrderItem = (order) => {
        return (
            <OrderItem order={ order } />
        )
    }

    return (
        <Grid
            container
            direction="row"
            justify="start"
            alignItems="center"
            spacing={ 4 }
        >
            { orders.map(renderOrderItem) }
        </Grid>
    )
}

export default OrderList
