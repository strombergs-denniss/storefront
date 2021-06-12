import FilterItem from './FilterItem.component'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import { Button, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import PriceRange from './PriceRange.component'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}))

export function FilterList(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const classes = useStyles()
    const { search: { attributes, aggregations, products }, query } = props

    const renderFilterItem = (attribute) => {
        return (
            <FilterItem attribute={ attribute } aggregations={ aggregations } />
        )
    }

    const onResetButtonClick = () => {
        if (query && query != ' ') {
            history.push('/search/ ')
        }

        dispatch({
            type: 'RESET_FILTERS'
        })
    }

    if (!attributes.length || !products.length) {
        return (
            <div>
                <Typography>No products found based on selected filters.</Typography>
                <Button onClick={ onResetButtonClick } variant="contained" color="primary">Reset</Button>
            </div>
        )
    }

    return (
        <div>
            <Typography>
                Filters
            </Typography>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={ classes.root }
            >
                    <PriceRange aggregations={ aggregations } />
                    { attributes.map(renderFilterItem) }
            </List>
        </div>
    )
}

export default FilterList
