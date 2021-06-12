import { useState } from 'react'
import { useSelector } from 'react-redux'
import SettingsIcon from '@material-ui/icons/Settings'
import { Box } from '@material-ui/core'
import { MenuItemLink } from 'react-admin'
import SubMenu from './SubMenu.component'
import ReviewResource from '../resource/Review/ReviewResource.component'
import ProductResource from '../resource/Product/ProductResource.component'
import CategoryResource from '../resource/Category/CategoryResource.component'
import OrderResource from '../resource/Order/OrderResource.component'
import InvoiceResource from '../resource/Invoice/InvoiceResource.component'
import BlockResource from '../resource/Block/BlockResource.component'
import PageResource from '../resource/Page/PageResource.component'
import CustomerResource from '../resource/Customer/CustomerResource.component'
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt'
import CallToActionIcon from '@material-ui/icons/CallToAction'
import UserResource from '../resource/User/UserResource.component'
import AttributeResource from '../resource/Attribute/AttributeResource.component'
import AttributeSetResource from '../resource/AttributeSet/AttributeSetResource.component'
import CustomerGroupResource from '../resource/CustomerGroup/CustomerGroupResource.component'
import ConfigResource from '../resource/Config/ConfigResource.component'
import ShippingMethodResource from '../resource/ShippingMethod/ShippingMethodResource.component'
import PaymentMethodResource from '../resource/PaymentMethod/PaymentMethodResource.component'
import SalesIcon from '@material-ui/icons/Euro'

export function Menu({ onMenuClick, dense = false }) {
    const [state, setState] = useState({
        menuCatalog: false,
        menuSales: false,
        menuCustomers: false
    })

    const open = useSelector((state) => state.admin.ui.sidebarOpen)

    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }))
    }

    return (
        <Box mt={1}>
            <SubMenu
                handleToggle={ () => handleToggle('menuSales') }
                isOpen={ state.menuSales }
                sidebarIsOpen={ open }
                name="Sales"
                icon={ <SalesIcon /> }
                dense={ dense }
            >
                <MenuItemLink
                    to={`/Order`}
                    primaryText="Orders"
                    leftIcon={ <OrderResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to={`/Invoice`}
                    primaryText="Invoices"
                    leftIcon={ <InvoiceResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
            </SubMenu>
            <SubMenu
                handleToggle={ () => handleToggle('menuCatalog') }
                isOpen={ state.menuCatalog }
                sidebarIsOpen={ open }
                name="Catalog"
                icon={ <ProductResource.icon /> }
                dense={ dense }
            >
                <MenuItemLink
                    to="/Product"
                    primaryText="Products"
                    leftIcon={ <ProductResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/Category"
                    primaryText="Categories"
                    leftIcon={ <CategoryResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
            </SubMenu>
            <SubMenu
                handleToggle={ () => handleToggle('menuMarketing') }
                isOpen={ state.menuMarketing }
                sidebarIsOpen={ open }
                name="Marketing"
                icon={ <CallToActionIcon /> }
                dense={ dense }
            >
                                <MenuItemLink
                    to="/Customer"
                    primaryText="Customers"
                    leftIcon={ <CustomerResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/CustomerGroup"
                    primaryText="Customer groups"
                    leftIcon={ <CustomerGroupResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/Review"
                    primaryText="Reviews"
                    leftIcon={ <ReviewResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
            </SubMenu>
            <SubMenu
                handleToggle={ () => handleToggle('menuContent') }
                isOpen={ state.menuContent }
                sidebarIsOpen={ open }
                name="Content"
                icon={ <ViewQuiltIcon /> }
                dense={ dense }
            >
                <MenuItemLink
                    to="/Page"
                    primaryText="Pages"
                    leftIcon={ <PageResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/Block"
                    primaryText="Blocks"
                    leftIcon={ <BlockResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
            </SubMenu>
            <SubMenu
                handleToggle={ () => handleToggle('menuSystem') }
                isOpen={ state.menuSystem }
                sidebarIsOpen={ open }
                name="System"
                icon={ <SettingsIcon /> }
                dense={ dense }
            >
                <MenuItemLink
                    to="/User"
                    primaryText="Users"
                    leftIcon={ <UserResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/Config/1"
                    primaryText="Config"
                    leftIcon={ <ConfigResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/AttributeSet"
                    primaryText="Attribute sets"
                    leftIcon={ <AttributeSetResource.icon /> }
                    onClick= {onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/Attribute"
                    primaryText="Attributes"
                    leftIcon={ <AttributeResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/ShippingMethod"
                    primaryText="Shipping methods"
                    leftIcon={ <ShippingMethodResource.icon /> }
                    onClick= {onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
                <MenuItemLink
                    to="/PaymentMethod"
                    primaryText="Payment methods"
                    leftIcon={ <PaymentMethodResource.icon /> }
                    onClick={ onMenuClick }
                    sidebarIsOpen={ open }
                    dense={ dense }
                />
            </SubMenu>
        </Box>
    )
}

export default Menu
