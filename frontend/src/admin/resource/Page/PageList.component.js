import { BooleanField, Datagrid, EditButton, List, TextField } from 'react-admin'

export function PageList(props) {
    return (
        <List { ...props } exporter={ false }>
            <Datagrid>
                <TextField source="id" />
                <TextField source="urlKey" />
                <BooleanField source="isEnabled" />
                <TextField source="title" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default PageList
