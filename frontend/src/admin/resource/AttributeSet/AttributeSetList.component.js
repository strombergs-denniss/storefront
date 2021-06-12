import { BooleanField, Datagrid, EditButton, List, TextField } from 'react-admin'

export function AttributeSetList(props) {
    return (
        <List { ...props } exporter={ false }>
            <Datagrid>
                <TextField source="id"/>
                <BooleanField source="isEnabled"/>
                <TextField source="name"/>
                <EditButton/>
            </Datagrid>
        </List>
    )
}

export default AttributeSetList
