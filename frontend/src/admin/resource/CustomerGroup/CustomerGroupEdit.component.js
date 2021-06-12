import { Edit, SimpleForm, TextInput, required } from 'react-admin'

export function CustomerGroupEdit(props) {
    return (
        <Edit { ...props }>
            <SimpleForm>
                <TextInput source="id" disabled fullWidth />
                <TextInput source="code" validate={ required() } fullWidth />
                <TextInput source="name" validate={ required() } fullWidth />
            </SimpleForm>
        </Edit>
    )
}

export default CustomerGroupEdit
