import { BooleanInput, Edit, SimpleForm, TextInput, required } from 'react-admin'
import RichTextInput from 'ra-input-rich-text'

export function PageEdit(props) {
    return (
        <Edit { ...props }>
            <SimpleForm>
                <TextInput source="id" disabled fullWidth />
                <TextInput source="urlKey" validate={ required() } fullWidth />
                <BooleanInput source="isEnabled" fullWidth />
                <TextInput source="title" validate={ required() } fullWidth />
                <RichTextInput source="content" fullWidth validate={ required() } />
            </SimpleForm>
        </Edit>
    )
}

export default PageEdit
