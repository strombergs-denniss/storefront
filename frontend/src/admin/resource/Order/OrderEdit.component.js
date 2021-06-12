import { Button } from '@material-ui/core'
import { Datagrid, DateInput, Edit, NumberField, NumberInput, ReferenceField, ReferenceManyField, showNotification, SimpleForm, TextField, TextInput, useRefresh } from 'react-admin'
import { useDispatch } from 'react-redux'
import { CONFIG } from '../../../base/Config'
import { fetchGraphQl } from '../../../base/Utility'
import { GENERATE_INVOICE } from '../../../storefront/query/Checkout.query'
import AddressField from '../Address/AddressField.component'
import CustomerField from '../Customer/CustomerField.component'
import OrderStatusInput from './OrderStatusInput.component'

export function OrderEdit(props) {
    const dispatch = useDispatch()
    const refresh = useRefresh()

    const onGenerateInvoiceButtonClick = async () => {
        const { id: orderId } = props
        const invoice = await fetchGraphQl(GENERATE_INVOICE, { orderId }, 'status', 'ADMIN')

        if (invoice) {
            dispatch(showNotification('Successfully (re)generated an invoice for this order.'))
            refresh()
        } else {
            dispatch(showNotification('Failed to to re(generate) invoice.'))
        }
    }

    return (
        <Edit { ...props }>
            <SimpleForm>
                <Button variant="contained" color="primary" onClick={ onGenerateInvoiceButtonClick }>(Re)generate Invoice</Button>
                <ReferenceField target="Invoice" source="Invoice.id" reference="Invoice" fullWidth>
                    <div>View invoice</div>
                </ReferenceField>
                <TextInput source="id" disabled fullWidth />
                <TextInput source="reference" disabled fullWidth />
                <DateInput source="date" disabled fullWidth />
                <OrderStatusInput fullWidth />
                <NumberInput source="totalDelivery" fullWidth />
                <NumberInput source="totalTax" disabled fullWidth />
                <NumberInput source="subtotal" disabled fullWidth />
                <NumberInput source="total" disabled fullWidth />
                <ReferenceManyField
                    source="id"
                    target="order_id"
                    reference="OrderItem"
                    label="Order items"
                    fullWidth
                >
                    <Datagrid>
                        <ReferenceField source="product_id" reference="Product">
                            <TextField source="name" />
                        </ReferenceField>
                        <NumberField source="quantity" />
                        <NumberField source="totalTax" />
                        <NumberField source="subtotal" />
                        <NumberField source="total" />
                    </Datagrid>
                </ReferenceManyField>
                <ReferenceField source="customer_id" reference="Customer">
                    <CustomerField />
                </ReferenceField>
                <ReferenceField source="address_id" reference="Address" fullWidth link={ false }>
                    <AddressField />
                </ReferenceField>
            </SimpleForm>
        </Edit>
    )
}

export default OrderEdit