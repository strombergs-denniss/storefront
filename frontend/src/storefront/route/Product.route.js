import { useParams } from 'react-router-dom'
import ProductGallery from '../component/product/ProductGallery.component'
import GetProduct from '../query/Product.query'
import ProductActions from '../component/product/ProductActions.component'
import ProductTabs from '../component/product/ProductTabs.component'
import { Box, Grid } from '@material-ui/core'

export function Product() {
    const { urlKey } = useParams()
    const product = GetProduct({ urlKey })

    if (!product) {
        return null
    }

    return (
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 } >
                <Grid container spacing={ 2 }>
                    <Grid item>
                        <Box width={ 640 }>
                            <ProductGallery product={ product } />
                        </Box>
                    </Grid>
                    <Grid item>
                        <ProductActions product={ product } />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={ 12 }>
                <ProductTabs product={ product } />
            </Grid>
        </Grid>
    )
}

export default Product
