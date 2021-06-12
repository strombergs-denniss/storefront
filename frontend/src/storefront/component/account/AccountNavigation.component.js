import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useDispatch } from 'react-redux'
import { signOut } from '../../dispatcher/Account.dispatcher'

export function AccountNavigation(props) {
    const dispatch = useDispatch()
    const { section } = props

    const onSignOutButtonClick = () => signOut({ dispatch })

    const sections = [
        {
            label: 'Settings',
            code: 'settings',
            url: '/account/settings'
        },
        {
            label: 'Addresses',
            code: 'addresses',
            url: '/account/addresses'
        },        {
            label: 'Orders',
            code: 'orders',
            url: '/account/orders'
        },
        {
            label: 'Reviews',
            code: 'reviews',
            url: '/account/reviews'
        }
    ]

    return (
        <List>
          { sections.map((text) => (
            <ListItem button component="a" href={ text.url } key={ text.label } selected={ text.code == section }>
              <ListItemText primary={ text.label } />
            </ListItem>
          ))}
            <ListItem button key="Sign out" onClick={ onSignOutButtonClick }>
              <ListItemText primary="Sign out" />
            </ListItem>
        </List>
    )
}

export default AccountNavigation
