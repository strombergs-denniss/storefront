import * as React from 'react'
import { useState } from 'react'
import { Field, withTypes } from 'react-final-form'
import { useLocation } from 'react-router-dom'

import {
    Button,
    Card,
    CardActions,
    CircularProgress,
    TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Notification, useLogin, useNotify } from 'react-admin'

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'url(https://source.unsplash.com/BNBA1h-NgdY)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
}))

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
)

const { Form } = withTypes()

const Login = () => {
    const [loading, setLoading] = useState(false)
    const classes = useStyles()
    const notify = useNotify()
    const login = useLogin()
    const location = useLocation()

    const handleSubmit = (auth) => {
        setLoading(true)
        login(auth, location.state ? location.state.nextPathname : '/').catch(
            (error) => {
                setLoading(false)
                notify(
                    typeof error === 'string'
                        ? error
                        : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                    'warning',
                    {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                ? error.message
                                : undefined,
                    }
                )
            }
        )
    }

    const validate = (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = 'Is required!'
        }
        if (!values.password) {
            errors.password = 'Is required!'
        }
        return errors
    }

    return (
        <Form
            onSubmit={ handleSubmit }
            validate={ validate }
            render={({ handleSubmit }) => (
                <form onSubmit={ handleSubmit } noValidate>
                    <div className={ classes.main }>
                        <Card className={ classes.card }>
                            <div className={ classes.form }>
                                <div className={ classes.input }>
                                    <Field
                                        autoFocus
                                        name="username"
                                        component={ renderInput }
                                        label="Username"
                                        disabled={ loading }
                                    />
                                </div>
                                <div className={ classes.input }>
                                    <Field
                                        name="password"
                                        component={ renderInput }
                                        label="Password"
                                        type="password"
                                        disabled={ loading }
                                    />
                                </div>
                            </div>
                            <CardActions className={ classes.actions }>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={ loading }
                                    fullWidth
                                >
                                    { loading && (
                                        <CircularProgress
                                            size={ 25 }
                                            thickness={ 2 }
                                        />
                                    )}
                                    Sign in
                                </Button>
                            </CardActions>
                        </Card>
                        <Notification />
                    </div>
                </form>
            )}
        />
    )
}

export default Login
