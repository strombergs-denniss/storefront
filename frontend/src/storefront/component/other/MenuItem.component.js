import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import { Link, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

export function MenuItem(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
      setOpen(!open)
    }

    const { children = [], menuItem: { name, urlKey } } = props

    const renderItem = (item) => {
        const { name, urlKey } = item

        return (
            <ListItem className={ classes.nested } button key={ name } component="a" href={ '/category/' + urlKey }>
                <ListItemText primary={ name } />
            </ListItem>
        )
    }

    if (!children.length) {
        return (
            <ListItem button key={ name } component="a" href={ '/category/' + urlKey }>
                <ListItemText primary={ name } />
            </ListItem>
        )
    }

    return (
        <>
            <ListItem button onClick={ handleClick }>
                <ListItemText primary={ <Link color="inherit" href={ '/category/' + urlKey }>{ name }</Link> } />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { children.map(renderItem) }
                </List>
            </Collapse>
        </>
    )
}

export default MenuItem
