import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import { Link, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { GetAllPages } from '../../query/Page.query'

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

export function PageMenuItem(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const pages = GetAllPages({})

    const handleClick = () => {
      setOpen(!open)
    }

    const renderItem = (item) => {
        const { title, urlKey } = item

        if (urlKey === 'homepage') {
            return null
        }

        return (
            <ListItem className={ classes.nested } button key={ title } component="a" href={ '/page/' + urlKey }>
                <ListItemText primary={ title } />
            </ListItem>
        )
    }

    if (!pages || !pages.length) {
        return null
    }

    return (
        <>
            <ListItem button onClick={ handleClick }>
                <ListItemText primary="Pages" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { pages.map(renderItem) }
                </List>
            </Collapse>
        </>
    )
}

export default PageMenuItem
