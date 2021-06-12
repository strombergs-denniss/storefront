import { BooleanInput, Create, SimpleForm, TextInput, required } from 'react-admin'

export function AttributeSetCreate(props) {
    return (
        <Create { ...props } title="Create an attribute set">
            <SimpleForm>
                <BooleanInput source="isEnabled" fullWidth/>
                <TextInput source="name" validate={ required() } fullWidth />
            </SimpleForm>
        </Create>
    )
}

export default AttributeSetCreate
