import { BooleanInput, Create, SimpleForm, TextInput, required } from 'react-admin'
import RichTextInput from 'ra-input-rich-text'

export function PageCreate(props) {
    return (
        <Create { ...props }>
            <SimpleForm>
                <TextInput source="urlKey" validate={ required() } fullWidth />
                <BooleanInput source="isEnabled" fullWidth />
                <TextInput source="title" validate={ required() } fullWidth />
                <RichTextInput source="content" fullWidth validate={ required() }  />
            </SimpleForm>
        </Create>
    )
}

export default PageCreate
