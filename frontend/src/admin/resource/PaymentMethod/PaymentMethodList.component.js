import { Datagrid, EditButton, List, TextField } from 'react-admin'

export function PaymentMethodList(props) {
    return (
        <List { ...props } exporter={ false }>
            <Datagrid>
                <TextField source="id" />
                <TextField source="code" />
                <TextField source="name" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default PaymentMethodList
