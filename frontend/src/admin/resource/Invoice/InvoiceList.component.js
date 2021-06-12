import { Datagrid, DateField, List, NumberField, ShowButton, TextField } from 'react-admin'

export function InvoiceList(props) {
    return (
        <List { ...props }>
            <Datagrid>
                <TextField source="id" />
                <DateField source="date" />
                <NumberField source="totalDelivery" />
                <NumberField source="totalTax" />
                <NumberField source="subtotal" />
                <NumberField source="total" />
                <ShowButton />
            </Datagrid>
        </List>
    )
}

export default InvoiceList
