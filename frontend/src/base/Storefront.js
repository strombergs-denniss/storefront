import Homepage from '../storefront/route/Homepage.route'
import Error from '../storefront/route/Error.route'
import { Switch, Route } from 'react-router-dom'
import Footer from '../storefront/component/other/Footer.component'
import Header from '../storefront/component/other/Header.component'
import Account from '../storefront/route/Account.route'
import Cart from '../storefront/route/Cart.route'
import Category from '../storefront/route/Category.route'
import Checkout from '../storefront/route/Checkout.route'
import Page from '../storefront/route/Page.route'
import Product from '../storefront/route/Product.route'
import Search from '../storefront/route/Search.route'
import Notification from '../storefront/component/other/Notification.component'
import { useDispatch } from 'react-redux'
import { GetConfig } from '../storefront/query/Config.query'

export function StoreFront() {
    const config = GetConfig()
    const dispatch = useDispatch()
    
    if (config) {
        dispatch({
            type: 'SET_CONFIG',
            payload: {
                config
            }
        })
    }

    const renderContent = () => {
        return (
            <>
                <Switch>
                    <Route path="/" render={ () => (<Homepage/>) } exact/>
                    <Route path="/checkout" render={ () => (<Checkout/>) } exact/>
                    <Route path="/account" render={ () => (<Account/>) } exact />
                    <Route path="/account/:section?/:action?/:id?" render={ () => (<Account/>) } />
                    <Route path="/cart" render={ () => (<Cart/>) } exact/>
                    <Route path="/category/:urlKey" render={ () => (<Category/>) }/>
                    <Route path="/page/:urlKey" render={ () => (<Page/>) }/>
                    <Route path="/product/:urlKey" render={ () => (<Product/>) }/>
                    <Route path="/search/:query" render={ () => (<Search/>) }/>
                    <Route path="/search" render={ () => (<Search/>) }/>
                    <Route render={ () => (<Error/>) }/>
                </Switch>
                <Footer/>
                <Notification />
            </>
        )
    }
    
    return (
        <>
            <Header content={ renderContent } />
        </>
    )
}

export default StoreFront
