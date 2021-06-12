import { useApolloClient } from '@apollo/client'
import { Button } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useDispatch } from 'react-redux'
import STYLE from '../../../base/Style'
import VALIDATION from '../../../base/Validation'
import { showNotification } from '../../dispatcher/Notification.dispatcher'
import { createCustomerAddress, deleteCustomerAddress, updateCustomerAddress } from '../../query/Address.query'
import { useHistory } from 'react-router-dom'
import CountrySelector, { countries } from './CountrySelector.component'

export function AddressFormFields() {
    return (
        <>
            <Field
                component={ TextField }
                type="text"
                name="firstName"
                label="First name"
                fullWidth
            />
            <Field
                component={ TextField }
                type="text"
                name="lastName"
                label="Last name"
                fullWidth
            />
            <Field
                component={ TextField }
                type="text"
                name="phoneNumber"
                label="Phone number"
                fullWidth
            />
            <CountrySelector />
            <Field
                component={ TextField }
                type="text"
                name="city"
                label="City"
                fullWidth
            />
            <Field
                component={ TextField }
                type="text"
                name="province"
                label="Province"
                fullWidth
            />
            <Field
                component={ TextField }
                type="text"
                name="street1"
                label="Street 1"
                fullWidth
            />
            <Field
                component={ TextField }
                type="text"
                name="street2"
                label="Street 2"
                fullWidth
            />
            <Field
                component={ TextField }
                type="text"
                name="postalCode"
                label="Postal code"
                fullWidth
            />
        </>
    )
}

export function AddressForm(props) {
    const dispatch = useDispatch()
    const client = useApolloClient()
    const history = useHistory()
    const classes = STYLE.form()
    const { address = {}, shouldRenderSubmitButton = true, mode } = props
    const initialValues = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: countries[0],
        city: '',
        province: '',
        street1: '',
        street2: '',
        postalCode: '',
        ...address
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false)
        const data = mode === 'create' ? await createCustomerAddress(client, values) : updateCustomerAddress(client, {
            id: address.id,
            ...values
        })
        const messages = {
            create: {
                SUCCESS: 'Successfully created new address.',
                ERROR: 'Failed to create new address.'
            },
            edit: {
                SUCCESS: 'Successfully updated your address.',
                ERROR: 'Failed to update your address.'
            }
        }

        if (data) {
            showNotification({ dispatch }, { severity: 'SUCCESS', message: messages[mode].SUCCESS })

            if (mode === 'create') {
                history.push('/account/addresses')
            }
        } else {
            showNotification({ dispatch }, { severity: 'ERROR', message: messages[mode].ERROR })
        }
    }

    const renderSaveButton = (props) => {
        const { submitForm, isSubmitting } = props

        if (!shouldRenderSubmitButton) {
            return null
        }

        return (
            <Button
                onClick={ submitForm }
                disabled={ isSubmitting }
                variant="contained"
                color="primary"
            >
                Save
            </Button>
        )
    }

    const onDeleteButtonClick = async () => {
        const status = await deleteCustomerAddress(client, { id: address.id })

        if (status) {
            showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully deleted your address.' })
            history.push('/account/addresses')
        } else {
            showNotification({ dispatch }, { severity: 'ERROR', message: 'Failed to delete your address.' })
        }
    }

    const renderDeleteButton = (props) => {
        if (mode !== 'edit') {
            return null
        }

        return (
            <Button
                onClick={ onDeleteButtonClick }
                variant="contained"
                color="primary"
            >
                Delete
            </Button>
        )
    }

    const renderForm = (props) => {
        return (
            <Form className={ classes.root }>
                <AddressFormFields />
                { renderSaveButton(props) }
                { renderDeleteButton() }
            </Form>
        )
    }

    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ VALIDATION.ADDRESS }
            onSubmit={ onSubmit }
        >
            { renderForm }
        </Formik>
    )
}

export default AddressForm
