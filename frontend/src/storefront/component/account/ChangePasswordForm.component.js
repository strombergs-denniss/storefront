import { useApolloClient } from '@apollo/client'
import { Button } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useDispatch } from 'react-redux'
import STYLE from '../../../base/Style'
import VALIDATION from '../../../base/Validation'
import { changePassword } from '../../dispatcher/Account.dispatcher'

export function ChangePasswordForm() {
    const client = useApolloClient()
    const dispatch = useDispatch()
    const classes = STYLE.form()
    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false)
        changePassword({ dispatch, client }, values)
    }

    const renderForm = (props) => {
        const { submitForm, isSubmitting } = props

        return (
            <Form className={ classes.root }>
                <Field
                    component={ TextField }
                    type="password"
                    name="oldPassword"
                    label="Old password"
                    fullWidth
                />
                <Field
                    component={ TextField }
                    type="password"
                    name="newPassword"
                    label="New password"
                    fullWidth
                />
                <Field
                    component={ TextField }
                    type="password"
                    name="confirmNewPassword"
                    label="Confirm new password"
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
        <Formik
            initialValues={ initialValues }
            validationSchema={ VALIDATION.PASSWORD }
            onSubmit={ onSubmit }
        >
            { renderForm }
        </Formik>
    )
}

export default ChangePasswordForm

