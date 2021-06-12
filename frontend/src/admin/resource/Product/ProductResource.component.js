import ProductIcon from '@material-ui/icons/Image'
import ProductList from './ProductList.component'
import ProductCreate from './ProductCreate.component'
import ProductEdit from './ProductEdit.component'

export const ProductResource = {
    name: 'Product',
    icon: ProductIcon,
    list: ProductList,
    create: ProductCreate,
    edit: ProductEdit
}

export default ProductResource
