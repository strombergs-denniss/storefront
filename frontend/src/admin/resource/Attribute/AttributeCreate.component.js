import { useState } from 'react'
import { BooleanInput, Create, SimpleForm, TextInput, required } from 'react-admin'
import AttributeOptionsInput from './AttributeOptionsInput.component'

export function AttributeCreate(props) {
    const [type, setType] = useState()

    const onTypeChange = (event) => {
        const { target: { value } } = event

        setType(value)
    }

    return (
        <Create { ...props }>
            <SimpleForm>
                <TextInput source="code" validate={ required() } fullWidth />
                <BooleanInput source="isEnabled" fullWidth />
                <TextInput source="label" validate={ required() } fullWidth />
                <AttributeOptionsInput type={ type } fullWidth isRequired />
                <BooleanInput source="isFilter" fullWidth />
            </SimpleForm>
        </Create>
    )
}

export default AttributeCreate
