import { Datagrid, EditButton, List, TextField } from 'react-admin'

export function UserList(props) {
    return (
        <List { ...props } exporter={ false }>
            <Datagrid>
                <TextField source="id" />
                <TextField source="username" />
                <TextField source="email" />
                <TextField source="firstName" />
                <TextField source="lastName" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default UserList
