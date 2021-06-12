import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import AccountNavigation from '../component/account/AccountNavigation.component'
import AccountSettings from '../component/account/AccountSettings.component'
import AccountSign from '../component/account/AccountSign.component'
import { Grid } from '@material-ui/core'
import OrderResource from '../component/account/OrderResource.component'
import AddressResource from '../component/account/AddressResource.component'
import ReviewResource from '../component/account/ReviewResource.component'

export function Account() {
    const account = useSelector(state => state.AccountReducer)
    const { section, action, id } = useParams()

    const renderSection = () => {
        switch (section) {
            case 'settings':
                return (
                    <AccountSettings />
                )
            case 'addresses':
                return (
                    <AddressResource action={ action } id={ id } />
                )
            case 'orders':
                return (
                    <OrderResource action={ action } id={ id } />
                )
            case 'reviews':
                return (
                    <ReviewResource action={ action } id={ id } />
                )
            default:
                return (
                    <Redirect to="/account/settings" />
                )
        }
    }

    const renderAccount = () => {
        return (
            <Grid container>
                <Grid item xs={ 2 }>
                    <AccountNavigation section={ section } />
                </Grid>
                <Grid items xs={ 10 }>
                    { renderSection() }
                </Grid>
            </Grid>
        )
    }

    const renderSign = () => {
        return (
            <AccountSign />
        )
    }

    return account.token ? renderAccount() : renderSign()
}

export default Account
