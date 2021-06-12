import CategoryIcon from '@material-ui/icons/Category'
import CategoryList from './CategoryList.component'
import CategoryCreate from './CategoryCreate.component'
import CategoryEdit from './CategoryEdit.component'

export const CategoryResource = {
    name: 'Category',
    icon: CategoryIcon,
    list: CategoryList,
    create: CategoryCreate,
    edit: CategoryEdit
}

export default CategoryResource
