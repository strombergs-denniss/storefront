import { Datagrid, DeleteButton, ReferenceField, ReferenceManyField, TextField } from 'react-admin'

export function CustomerCustomerGroupInput(props) {
    return (
        <ReferenceManyField
            source="id"
            target="customer_id"
            reference="CustomerCustomerGroup"
        >
            <Datagrid>
                <ReferenceField source="customer_group_id" reference="CustomerGroup">
                    <TextField source="name" />
                </ReferenceField>
                <DeleteButton redirect={ false } />
            </Datagrid>
        </ReferenceManyField>
    )
}

export default CustomerCustomerGroupInput
