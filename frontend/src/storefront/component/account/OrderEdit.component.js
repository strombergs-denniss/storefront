import { Typography } from '@material-ui/core'
import { GetCustomerOrder } from '../../query/Order.query'
import AddressItem from './AddressItem.component'
import OrderForm from './OrderForm.component'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import Price from '../product/Price.component'

export function OrderEdit(props) {
    const { id } = props
    const order = GetCustomerOrder({ id })

    if (!order) {
        return null
    }

    const { address, items } = order
    const columns = [
        {
            field: 'product',
            headerName: 'Product',
            renderCell: ({ row: { product: { urlKey, name } = {} } = {} }) => {
                return (
                    <Link to={ '/product/' + urlKey }> { name } </Link>
                )
            },
            width: 300
        },
        {
            field: 'quantity',
            headerName: 'Quantity'
        },
        {
            field: 'totalTax',
            headerName: 'Total tax',
            renderCell: ({ row: { totalTax } }) => <Price value={ totalTax } />
        },
        {
            field: 'subtotal',
            headerName: 'Subtotal',
            renderCell: ({ row: { subtotal } }) => <Price value={ subtotal } />
        },
        {
            field: 'total',
            headerName: 'Total',
            renderCell: ({ row: { total } }) => <Price value={ total } />
        }
    ]

    const rows = items.map((item, id) => ({
        id,
        ...item
    }))

    return (
        <div>
            <OrderForm order={ order } />
            <Typography>Items</Typography>
            <DataGrid
                columns={ columns }
                rows={ rows }
                autoHeight
                hideFooterPagination
                disableColumnMenu
                disableSelectionOnClick
            />
            <Typography>Address</Typography>
            <AddressItem address={ address } shouldRenderActions={ false } width={ 12 } />
        </div>
    )
}

export default OrderEdit
