import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CartOverlay from '../cart/CartOverlay.component'
import SearchOverlay from '../search/SearchOverlay.component'
import AccountOverlay from '../account/AccountOverlay.component'
import { Link } from '@material-ui/core'
import Menu from './Menu.component'

const drawerWidth = 320

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth
    },
    title: {
        flexGrow: 1
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0
    },
}))

export function Header(props) {
    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const { content } = props

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={ classes.root }>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={ clsx(classes.appBar, { [classes.appBarShift]: open }) }
            >
                <Toolbar>
                    <Typography variant="h6" noWrap className={ classes.title }>
                        <Link href="/" color="inherit">Storefront</Link>
                    </Typography>
                    <AccountOverlay />
                    <CartOverlay />
                    <SearchOverlay />
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={ handleDrawerOpen }
                        className={ clsx(open && classes.hide) }
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main
                className={ clsx(classes.content, { [classes.contentShift]: open }) }
            >
                <div className={classes.drawerHeader} />
                { content() }
            </main>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={ { paper: classes.drawerPaper } }
            >
                <div className={ classes.drawerHeader }>
                    <IconButton onClick={ handleDrawerClose }>
                        { theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
                    </IconButton>
                </div>
                <Divider />
                <Menu />
            </Drawer>
        </div>
    )
}

export default Header
