import { Layout as ReactAdminLayout, Notification } from 'react-admin'
import Menu from './Menu.component'

export function Layout(props) {
    return (
        <ReactAdminLayout {...props } menu={ Menu }/>
    )
}

export default Layout
