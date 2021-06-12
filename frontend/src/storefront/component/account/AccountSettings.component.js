import { useApolloClient } from '@apollo/client'
import { Button, Typography } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useDispatch, useSelector } from 'react-redux'
import STYLE from '../../../base/Style'
import VALIDATION from '../../../base/Validation'
import { updateAccount } from '../../dispatcher/Account.dispatcher'
import ChangePasswordForm from './ChangePasswordForm.component'

export function AccountSettings() {
    const client = useApolloClient()
    const dispatch = useDispatch()
    const classes = STYLE.form()
    const account = useSelector((state) => state.AccountReducer)
    const initialValues = account

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false)
        updateAccount({ dispatch, client }, values)
    }

    const renderForm = (props) => {
        const { submitForm, isSubmitting } = props

        return (
            <Form className={ classes.root }>
                <Field
                    component={ TextField }
                    type="email"
                    name="email"
                    label="Email"
                    fullWidth
                />
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
                <Button
                    onClick={ submitForm }
                    disabled={ isSubmitting }
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </Form>
        )
    }

    return (
        <div>
            <Typography variant="h5">Settings</Typography>
            <Formik
                initialValues={ initialValues }
                validationSchema={ VALIDATION.ACCOUNT }
                onSubmit={ onSubmit }
            >
                { renderForm }
            </Formik>
            <ChangePasswordForm />
        </div>
    )
}

export default AccountSettings
