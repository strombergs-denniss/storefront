import { useParams } from 'react-router-dom'
import ProductList from '../component/search/ProductList.component'

export function Search() {
    const { urlKey, query = '' } = useParams()

    return (
        <ProductList isSearch urlKey={ urlKey } query={ query } />
    )
}

export default Search
