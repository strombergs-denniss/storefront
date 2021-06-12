import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Box, Button, ButtonBase, CardActions, Grid, makeStyles } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton'

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
})

export function AddressItem(props) {
    const classes = useStyles()
    const { width = 6, address, addressId, address: { id }, shouldRenderActions = true, onClick } = props

    const fields = [
        {
            label: 'First name',
            key: 'firstName'
        },
        {
            label: 'Last name',
            key: 'lastName'
        },
        {
            label: 'Phone number',
            key: 'phoneNumber'
        },
        {
            label: 'Country',
            key: 'country'
        },
        {
            label: 'City',
            key: 'city'
        },
        {
            label: 'Province',
            key: 'province'
        },
        {
            label: 'Street 1',
            key: 'street1'
        },
        {
            label: 'Street 2',
            key: 'street2'
        },
        {
            label: 'Postal code',
            key: 'postalCode'
        }
    ]

    const renderField = (field) => {
        const { label, key } = field
        const { [key]: value } = address

        return (
            <Grid container justify="space-between">
                <Typography variant="body" component="dt">
                    { label }
                </Typography>
                <Typography variant="body" component="dd">
                    { value }
                </Typography>
            </Grid>
        )
    }

    const renderActions = () => {
        if (!shouldRenderActions) {
            return null
        }

        return (
            <CardActions>
                <Button variant="contained" color="primary" href={ 'addresses/edit/' + id }>Edit</Button>
            </CardActions>
        )
    }

    const renderCard = () => {
        return (
            <Box width={ 1 }>
                <Card>
                    <CardContent>
                        { fields.map(renderField) }
                    </CardContent>
                    { renderActions() }
                </Card>
            </Box>
        )
    }

    const renderButtonBase = () => {
        return (
            <ToggleButton className={ classes.root } onClick={ () => onClick(address.id) } selected={ addressId == id }>
                { renderCard() }
            </ToggleButton>
        )
    }

    return (
        <Grid item xs={ width }>
            { onClick ? renderButtonBase() : renderCard() }
        </Grid>
    )
}

export default AddressItem
