import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import ProductItem from './ProductItem.component'
import FilterList from './FilterList.component'
import Pagination from './Pagination.component'
import Sort from './Sort.component'
import parse from 'html-react-parser'
import { Search } from '../../query/Search.query'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}))

export function ProductList(props) {
    const classes = useStyles()
    const { urlKey, query } = props
    const { perPage, sort, page, attributeValues, minPrice, maxPrice } = useSelector((state) => state.SearchReducer)

    const search = Search({
        categoryUrlKey: urlKey,
        search: query,
        perPage,
        sort,
        page,
        attributeValues: JSON.stringify(attributeValues),
        minPrice,
        maxPrice
    })


    if (!search) {
        return null
    }

    const { products, category } = search
    const { content } = category || {}

    const renderProductItem = (product) => {
        return (
            <ProductItem product={ product } />
        )
    }

    const renderNoProducts = () => {
        return (
            <>
                <Grid item xs={ 3 }>
                    <FilterList search={ search } />
                </Grid>
                <Grid item xs={ 9 }>
                    <Typography>
                        No products found
                    </Typography>
                </Grid>
            </>
        )
    }

    const renderProducts = () => {
        return (
            <>
                <Grid item xs={ 3 }>
                    <FilterList search={ search } query={ query } />
                </Grid>
                <Grid item xs={ 9 }>
                    <Box marginBottom={ 2 }>
                        <Sort />
                    </Box>
                    <Grid
                        container
                        direction="row"
                        justify="start"
                        alignItems="center"
                        spacing={ 4 }
                    >
                        { products.map(renderProductItem)  }
                    </Grid>
                    <Box marginTop={ 2 }>
                        <Pagination page={ page } search={ search } />
                    </Box>
                </Grid>
            </>
        )
    }

    return (
        <div className={ classes.root }>
            { content ? parse(content) : null }
            <Grid container spacing={ 3 }>
                { products.length ? renderProducts() : renderNoProducts() }
            </Grid>
        </div>
    )
}

export default ProductList
