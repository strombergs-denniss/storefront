import { Edit, SimpleForm, TextInput, required, SaveButton, Toolbar } from 'react-admin'

export const EditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton redirect={ false } />
    </Toolbar>
);

export function ConfigEdit(props) {
    return (
        <Edit { ...props } delete>
            <SimpleForm toolbar={ <EditToolbar /> }>
                <TextInput source="currencySign" validate={ required() } fullWidth />
            </SimpleForm>
        </Edit>
    )
}

export default ConfigEdit
