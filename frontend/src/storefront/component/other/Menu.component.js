import { GetAllCategories } from '../../query/Category.query'
import List from '@material-ui/core/List'
import MenuItem from './MenuItem.component'
import { PageMenuItem } from './PagesMenuItem.component'

export function Menu() {
    const categories = GetAllCategories()

    if (!categories) {
        return null
    }

    const rootCategory = categories.find((category) => category.id === '1')

    const renderFirstLevelItem = (parentCategory) => {
        const children = categories.filter((category) => category.categoryId == parentCategory.id && category.name != 'Root')
    
        return (
            <MenuItem menuItem={ parentCategory } categories={ categories } children={ children } />
        )
    }

    const renderFirstLevelList = () => {
        const children = categories.filter((category) => category.categoryId == rootCategory.id && category.name != 'Root')

        return children.map(renderFirstLevelItem)
    }

    return (
        <List>
            { renderFirstLevelList() }
            <PageMenuItem />
        </List>
    )
}

export default Menu
