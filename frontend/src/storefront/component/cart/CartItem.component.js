import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, IconButton } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import DeleteIcon from '@material-ui/icons/Delete'
import { useApolloClient } from '@apollo/client'
import { addProductToCart, removeProductFromCart } from '../../dispatcher/Cart.dispatcher'
import { ProductPrice } from '../product/ProductPrice.component'

const useStyles = makeStyles({
    media: {
        height: 128,
        width: 128,
    },
    area: {
        display: 'flex',
        justifyContent: 'flex-start'
    }
})

export function CartItem(props) {
    const dispatch = useDispatch()
    const client = useApolloClient()
    const history = useHistory()
    const classes = useStyles()
    const { item: { product, product: { id, sku, name, urlKey, price, thumbnailImage: { url } = {} }, quantity }, shouldRenderCartItemActions = true } = props

    const onProductClick = () => {
        history.push(`/product/${ urlKey }`)
    }

    const onAddButtonClick = async () => addProductToCart({ dispatch, client }, { productId: id, quantity: 1 })

    const onRemoveButtonClick = async () => removeProductFromCart({ dispatch, client }, { productId: id, quantity: 1 })

    const onDeleteButtonClick = async () => removeProductFromCart({ dispatch, client }, { productId: id, quantity })

    const renderCartAction = () => {
        return (
            <CardActions>
                <IconButton onClick={ onAddButtonClick } disabled={ !shouldRenderCartItemActions }>
                    <AddIcon />
                </IconButton>
                <Typography>
                    { quantity }
                </Typography>
                <IconButton onClick={ onRemoveButtonClick } disabled={ !shouldRenderCartItemActions }>
                    <RemoveIcon />
                </IconButton>
                <IconButton onClick={ onDeleteButtonClick } disabled={ !shouldRenderCartItemActions }>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        )
    }

    return (
        <Grid item xs={ 12 }>
            <Box>
                <Card className={ classes.root } >
                    <CardActionArea onClick={ onProductClick } className={ classes.area }>
                        <div>
                            <CardMedia
                                className={ classes.media }
                                image={ url }
                                title={ name }
                            />
                        </div>
                        <div>
                            <CardContent>
                                <Typography gutterBottom variant="body">
                                    { sku }
                                </Typography>
                                <Typography gutterBottom variant="h6">
                                    { name }
                                </Typography>
                                <Typography gutterBottom variant="h6">
                                    <ProductPrice product={ product } />
                                </Typography>
                            </CardContent>
                        </div>
                    </CardActionArea>
                    { renderCartAction() }
                </Card>
            </Box>
        </Grid>
    )
}

export default CartItem
