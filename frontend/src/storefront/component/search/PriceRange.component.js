import React from 'react'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@material-ui/core'

export function PriceRange(props) {
    const dispatch = useDispatch()
    const { aggregations: { minPrice, maxPrice } = {} } = props
    const filter = useSelector((state) => state.SearchReducer)
    const [value, setValue] = React.useState([filter.minPrice, filter.maxPrice])

    const handleChange = (_, newValue) => {
        setValue(newValue)
    }
    
    const onChangeCommitted = () => {
        dispatch({
            type: 'SET_PRICE_RANGE',
            payload: {
                minPrice: value[0],
                maxPrice: value[1]
            }
        })
    }

    return (
        <Box padding={ 2 }>
            <Typography id="price-range" gutterBottom>
                Price range
            </Typography>
            <Slider
                value={ value }
                onChange={ handleChange }
                onChangeCommitted={ onChangeCommitted }
                valueLabelDisplay="auto"
                aria-labelledby="price-range"
                min={ minPrice }
                max={ maxPrice }
            />
        </Box>
    )
}

export default PriceRange
