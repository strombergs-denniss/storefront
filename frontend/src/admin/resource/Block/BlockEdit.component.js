import { BooleanInput, Edit, SimpleForm, TextInput, required } from 'react-admin'
import RichTextInput from 'ra-input-rich-text'

export function BlockEdit(props) {
    return (
        <Edit { ...props }>
            <SimpleForm>
                <TextInput source="id" disabled fullWidth />
                <TextInput source="code" validate={ required() } fullWidth />
                <BooleanInput source="isEnabled" fullWidth />
                <RichTextInput source="content" validate={ required() } fullWidth />
            </SimpleForm>
        </Edit>
    )
}

export default BlockEdit
