import { DateField, NumberField, ReferenceField, TextField, Datagrid, ReferenceManyField, SimpleForm, Edit } from 'react-admin'
import OrderField from '../Order/OrderField.component'
import AddressField from '../Address/AddressField.component'
import CustomerField from '../Customer/CustomerField.component'

export function InvoiceEdit(props) {
    return (
        <Edit { ...props }>
            <SimpleForm>
                <TextField source="id" />
                <DateField source="date" />
                <NumberField source="totalDelivery" />
                <NumberField source="totalTax" />
                <NumberField source="subtotal" />
                <NumberField source="total" />
                <ReferenceField source="order_id" reference="Order">
                    <OrderField />
                </ReferenceField>
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
                <ReferenceField source="order_id" reference="Order" label="Customer" link={ false }>
                    <ReferenceField source="customer_id" reference="Customer" link={ false }>
                        <CustomerField />
                    </ReferenceField>
                </ReferenceField>
                <ReferenceField source="order_id" reference="Order" fullWidth label="Address" link={ false }>
                    <ReferenceField source="address_id" reference="Address" fullWidth link={ false }>
                        <AddressField />
                    </ReferenceField>
                </ReferenceField>
            </SimpleForm>
        </Edit>
    )
}

export default InvoiceEdit
