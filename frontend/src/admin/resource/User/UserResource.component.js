import UserIcon from '@material-ui/icons/SupervisorAccount'
import UserList from './UserList.component'
import UserCreate from './UserCreate.component'
import UserEdit from './UserEdit.component'

export const UserResource = {
    name: 'User',
    icon: UserIcon,
    list: UserList,
    create: UserCreate,
    edit: UserEdit
}

export default UserResource
