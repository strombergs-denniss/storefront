import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

export function FilterItem(props) {
    const { attributeValues } = useSelector((state) => state.SearchReducer)
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { attribute: { label, code } } = props
    const { aggregations: { filterValues } } = props
    const [checked, setChecked] = useState([0, ...Object.keys(attributeValues[code] || {}).map((val) => parseInt(val)) ])

    const handleClick = () => {
        setOpen(!open)
    }
    
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        const [, ...checkedMap] = newChecked
        const values = {}
        checkedMap.forEach((val) => values[val] = Object.keys(filterValues[code])[val - 1])

        dispatch({
            type: 'SET_ATTRIBUTE_VALUES',
            payload: {
                code,
                values
            }
        })

        setChecked(newChecked)
    }

    const renderFilterValue = (filterValue, indexs) => {
        const index = indexs + 1
        const labelId = `checkbox-list-label-${ index }`

        return (
            <ListItem button className={ classes.nested } dense button onClick={ handleToggle(index) }>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={ -1 }
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText primary={ filterValue } />
            </ListItem>
        )
    }

    return (
        <>
            <ListItem button onClick={ handleClick }>
                <ListItemText primary={ label } />
                { open ? <ExpandLess /> : <ExpandMore /> }
            </ListItem>
            <Collapse in={ open } timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { Object.keys(filterValues[code]).map(renderFilterValue) }
                </List>
            </Collapse>
        </>
    )
}

export default FilterItem
