import { SelectInput } from 'react-admin'

export const productTypeChoices = [
    {
        id: 'ordered',
        name: 'Ordered'
    },
    {
        id: 'delivered',
        name: 'Delivered'
    },
    {
        id: 'canceled',
        name: 'Canceled'
    }
]

export function OrderStatusInput(props) {
    return (
        <SelectInput { ...props } source='status' choices={ productTypeChoices } />
    )
}

export default OrderStatusInput
