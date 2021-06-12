import { useParams } from 'react-router-dom'
import ProductList from '../component/search/ProductList.component'

export function Category() {
    const { urlKey, query = '' } = useParams()

    return (
        <ProductList isCategory urlKey={ urlKey } query={ query } />
    )
}

export default Category
