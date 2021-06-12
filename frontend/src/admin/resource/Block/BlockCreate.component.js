import { BooleanInput, Create, SimpleForm, TextInput, required } from 'react-admin'
import RichTextInput from 'ra-input-rich-text'

export function BlockCreate(props) {
    return (
        <Create { ...props }>
            <SimpleForm>
                <TextInput source="code" validate={ required() } fullWidth />
                <BooleanInput source="isEnabled" fullWidth />
                <RichTextInput source="content" validate={ required() } fullWidth />
            </SimpleForm>
        </Create>
    )
}

export default BlockCreate
