import { Create, PasswordInput, SimpleForm, TextInput, required, email } from 'react-admin'

export function CustomerCreate(props) {
    return (
        <Create { ...props }>
            <SimpleForm>
                <TextInput source="email" validate={ [required(), email()] } fullWidth />
                <PasswordInput source="password" validate={ required() } fullWidth />
                <TextInput source="firstName" validate={ required() } fullWidth />
                <TextInput source="lastName" validate={ required() } fullWidth />
            </SimpleForm>
        </Create>
    )
}

export default CustomerCreate
