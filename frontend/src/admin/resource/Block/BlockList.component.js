import { BooleanField, Datagrid, EditButton, List, TextField } from 'react-admin'

export function BlockList(props) {
    return (
        <List { ...props } exporter={ false }>
            <Datagrid>
                <TextField source="id" />
                <TextField source="code" />
                <BooleanField source="isEnabled" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default BlockList
