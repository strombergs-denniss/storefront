import { Datagrid, DateField, EditButton, List, NumberField, TextField } from 'react-admin'

export function ReviewList(props) {
    return (
        <List { ...props }>
            <Datagrid>
                <TextField source="id" />
                <TextField source="status" />
                <DateField source="date" />
                <NumberField source="rating" />
                <EditButton />
            </Datagrid>
        </List>
    )
}

export default ReviewList
