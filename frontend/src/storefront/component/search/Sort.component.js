import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useDispatch, useSelector } from 'react-redux'

const items = [
    {
        value: 'NO_ORDER',
        label: 'No order'
    },
    {
        value: 'NAME_ASC',
        label: 'Name A-Z'
    },
    {
        value: 'NAME_DESC',
        label: 'Name Z-A'
    },
    {
        value: 'PRICE_ASC',
        label: 'Lowest price'
    },
    {
        value: 'PRICE_DESC',
        label: 'Highest price'
    },
    {
        value: 'SOLD_AMOUNT_ASC',
        label: 'Lowest sold amount'
    },
    {
        value: 'SOLD_AMOUNT_DESC',
        label: 'Highest sold amount'
    }
]

export function Sort(props) {
    const dispatch = useDispatch()
    const { sort } = useSelector((state) => state.SearchReducer)

    const onClick = (event) => {
        dispatch({
            type: 'SET_SORT',
            payload: {
                sort: event.target.value
            }
        })
    }

    const renderItem = (item) => {
        return (
            <MenuItem value={ item.value }>
                { item.label }
            </MenuItem>
        )
    }

    return (
        <Select
            onChange={ onClick }
            fullWidth
            value={ sort }
        >
            { items.map(renderItem) }
        </Select>
    )
}

export default Sort
