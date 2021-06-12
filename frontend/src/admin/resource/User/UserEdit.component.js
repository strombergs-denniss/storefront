import { Edit, SimpleForm, TextInput, required, email, useRefresh, PasswordInput, showNotification, Toolbar } from 'react-admin'
import { useDispatch } from 'react-redux'
import { fetchGraphQl } from '../../../base/Utility'
import { UPDATE_USER } from '../../../storefront/query/User.query'

export function UserEdit(props) {
    const dispatch = useDispatch()
    const refresh = useRefresh()

    const onSave = async (props) => {
        const user = await fetchGraphQl(UPDATE_USER, { ...props }, 'user', 'ADMIN')

        if (user) {
            dispatch(showNotification('Successfully updated user.'))
            refresh()
        } else {
            dispatch(showNotification('Failed to update user, incorrect password was entered.'))
        }
    }

    return (
        <Edit { ...props }>
            <SimpleForm save={ onSave } toolbar={ <Toolbar alwaysEnableSaveButton />  }>
                <TextInput source="id" disabled />
                <TextInput source="username" validate={ required() } />
                <TextInput source="email" type="email" validate={ [required(), email()] } />
                <TextInput source="firstName" validate={ required() } />
                <TextInput source="lastName" validate={ required() } />
                <PasswordInput source="password" />
                <PasswordInput source="currentPassword" validate={ required() } />
            </SimpleForm>
        </Edit>
    )
}

export default UserEdit
