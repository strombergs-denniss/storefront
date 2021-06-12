import { BooleanField, Datagrid, DateField, EditButton, List, NumberField, TextField } from 'react-admin'

export function OrderList(props) {
    return (
        <List { ...props }>
            <Datagrid>
                <TextField source="id" />
                <TextField source="reference" />
                <DateField source="date" />
                <TextField source="status" />
                <NumberField source="totalDelivery" />
                <NumberField source="totalTax" />
                <NumberField source="subtotal" />
                <NumberField source="total" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default OrderList
