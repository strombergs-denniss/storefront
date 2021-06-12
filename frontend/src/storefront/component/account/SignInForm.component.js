import { useApolloClient } from '@apollo/client'
import { Button } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import STYLE from '../../../base/Style'
import VALIDATION from '../../../base/Validation'
import { signIn } from '../../dispatcher/Account.dispatcher'

export function SignInForm() {
    const dispatch = useDispatch()
    const client = useApolloClient()
    const history = useHistory()
    const classes = STYLE.form()
    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(false)
        signIn({ dispatch, client, history }, values)
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
                    type="password"
                    name="password"
                    label="Password"
                    fullWidth
                />
                <Button
                    onClick={ submitForm }
                    disabled={ isSubmitting }
                    variant="contained"
                    color="primary"
                >
                    Sign in
                </Button>
            </Form>
        )
    }

    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ VALIDATION.SIGN_IN }
            onSubmit={ onSubmit }
        >
            { renderForm }
        </Formik>
    )
}

export default SignInForm
