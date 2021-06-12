import { GetAllShippingMethods } from '../../query/Checkout.query'
import { Button, FormControlLabel, Radio, FormControl, FormLabel, Grid } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { RadioGroup } from 'formik-material-ui'
import { Typography } from '@material-ui/core'
import CheckoutAddressSelector from './CheckoutAddressSelector.component'
import { useState } from 'react'
import VALIDATION from '../../../base/Validation'
import { showNotification } from '../../dispatcher/Notification.dispatcher'
import { useDispatch } from 'react-redux'
import { createCustomerAddress, GetAllCustomerAddresses } from '../../query/Address.query'
import { useApolloClient } from '@apollo/client'

export function CheckoutShippingStep(props) {
    const dispatch = useDispatch()
    const client = useApolloClient()
    const [addressId, setAddressId] = useState(0)
    const shippingMethods = GetAllShippingMethods()
    const { setStep } = props
    const addresses = GetAllCustomerAddresses() || []

    if (!shippingMethods || !shippingMethods.length) {
        return null
    }

    const initialValues = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: '',
        city: '',
        province: '',
        street1: '',
        street2: '',
        postalCode: '',
        shippingMethod: shippingMethods[0].code
    }

    const onSubmit = async (values, { setSubmitting }) => {
        const { shippingMethod } = values
        setSubmitting(false)

        if (addresses.length) {
            if (addressId) {
                dispatch({ type: 'SET_ADDRESS', payload: addresses.find((address) => address.id == addressId) })
                setStep('BILLING')
            } else {
                showNotification({ dispatch }, { severity: 'ERROR', message: 'Please create or select shipping address.' })
            }
        } else {
            const address = await createCustomerAddress(client, values)
            
            if (address ) {
                setAddressId(address.id)
                dispatch({ type: 'SET_ADDRESS', payload: address })
                setStep('BILLING')
            }
        }

        dispatch({ type: 'SET_SHIPPING_METHOD', payload: shippingMethod })
    }

    const renderShippingMethod = function(shippingMethod) {
        const { code, name } = shippingMethod

        return (
            <FormControlLabel
                value={ code }
                control={ <Radio disabled={ this.isSubmitting } /> }
                label={ name }
                disabled={ this.isSubmitting }
            />
        )
    }

    const renderForm = ({ isSubmitting, submitForm }) => {
        return (
            <Form>
                <Typography variant="h3">Shipping</Typography>
                <CheckoutAddressSelector addresses={ addresses } addressId={ addressId } setAddressId={ setAddressId } />
                <Typography variant="h6">Choose shipping method:</Typography>
                <FormControl fullWidth>
                    <FormLabel htmlFor="shippingMethod">Shipping method</FormLabel >
                    <Field component={ RadioGroup } name="shippingMethod">
                        { shippingMethods.map(renderShippingMethod, { isSubmitting }) }
                    </Field>
                </FormControl>
                <Button
                    onClick={ submitForm }
                    disabled={ isSubmitting }
                    variant="contained"
                    color="primary"
                >
                    Proceed to billing
                </Button>
            </Form>
        )
    }

    return (
        <Grid container spacing={ 4 }>
            <Grid item xs={ 12 }>
                <Formik
                    initialValues={ initialValues }
                    onSubmit={ onSubmit }
                    validationSchema={ addresses.length ? VALIDATION.SHIPPING_STEP : VALIDATION.SHIPPING_STEP_WITH_ADDRESS }
                >
                    { renderForm }
                </Formik>
            </Grid>
        </Grid>
    )
}

export default CheckoutShippingStep
