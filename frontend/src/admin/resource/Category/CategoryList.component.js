import { BooleanField, Datagrid, EditButton, List, NumberField, TextField } from 'react-admin'

export function CategoryList(props) {
    return (
        <List { ...props }>
            <Datagrid>
                <TextField source="id" />
                <TextField source="urlKey" />
                <BooleanField source="isEnabled" />
                <TextField source="name" />
                <BooleanField source="isInMenu" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default CategoryList
