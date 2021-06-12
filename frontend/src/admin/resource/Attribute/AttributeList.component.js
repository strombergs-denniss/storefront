import { BooleanField, Datagrid, EditButton, List, TextField } from 'react-admin'

export function AttributeList(props) {
    return (
        <List { ...props } exporter={ false }>
            <Datagrid>
                <TextField source="id" />
                <TextField source="code" />
                <BooleanField source="isEnabled" />
                <TextField source="label" />
                <TextField source="type" />
                <BooleanField source="isFilter" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default AttributeList
