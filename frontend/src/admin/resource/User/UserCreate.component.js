import { Create, PasswordInput, SimpleForm, TextInput, required, email } from 'react-admin'

export function UserCreate(props) {
    return (
        <Create { ...props }>
            <SimpleForm >
                <TextInput source="username" validate={ required() } />
                <TextInput source="email" type="email" validate={ [required(), email()] } />
                <PasswordInput source="password" validate={ required() } />
                <TextInput source="firstName" validate={ required() } />
                <TextInput source="lastName" validate={ required() } />
            </SimpleForm>
        </Create>
    )
}

export default UserCreate
