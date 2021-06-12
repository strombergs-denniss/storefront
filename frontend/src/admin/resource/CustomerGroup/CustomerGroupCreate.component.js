import { Create, SimpleForm, TextInput, required } from 'react-admin'

export function CustomerGroupCreate(props) {
    return (
        <Create { ...props }>
            <SimpleForm>
                <TextInput source="code" validate={ required() } fullWidth />
                <TextInput source="name" validate={ required() } fullWidth />
            </SimpleForm>
        </Create>
    )
}

export default CustomerGroupCreate
