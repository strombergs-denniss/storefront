import { useApolloClient } from '@apollo/client'
import { Button, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField, Select } from 'formik-material-ui'
import { useDispatch, useSelector } from 'react-redux'
import STYLE from '../../../base/Style'
import VALIDATION from '../../../base/Validation'
import { createCustomerReview, deleteCustomerReview, updateCustomerReview } from '../../query/Review.query'
import { useHistory } from 'react-router-dom'
import { showNotification } from '../../dispatcher/Notification.dispatcher'

export function ReviewForm(props) {
    const account = useSelector((state) => state.AccountReducer)
    const dispatch = useDispatch()
    const client = useApolloClient()
    const history = useHistory()
    const { productId, review, mode, setPostedReview } = props
    const classes = STYLE.form()
    const initialValues = {
        title: '',
        content: '',
        rating: 10,
        ...review
    }

    const onSubmit = async (values, { setSubmitting }) => {
        setSubmitting(false)
        const data = mode === 'create' ? await createCustomerReview(client, {
            productId: review?.product?.id || productId,
            ...values
        }) : await updateCustomerReview(client, {
            id: review.id,
            ...values
        })
        const messages = {
            create: {
                SUCCESS: 'Successfully posted new review.',
                ERROR: 'Failed to post new review, you either have not bought this product or trying to post second review.'
            },
            edit: {
                SUCCESS: 'Successfully updated your review.',
                ERROR: 'Failed to update your review.'
            }
        }

        if (data) {
            showNotification({ dispatch }, { severity: 'SUCCESS', message: messages[mode].SUCCESS })

            if (setPostedReview) {
                setPostedReview({
                    ...data,
                    customer: {
                        firstName: account?.firstName,
                        lastName: account?.firstName
                    }
                })
            }

            if (mode === 'edit') {
                history.push('/account/reviews')
            }
        } else {
            showNotification({ dispatch }, { severity: 'ERROR', message: messages[mode].ERROR })
        }
    }

    const onDeleteButtonClick = async () => {
        const status = await deleteCustomerReview(client, { id: review.id })

        if (status) {
            showNotification({ dispatch }, { severity: 'SUCCESS', message: 'Successfully deleted your review.' })
            history.push('/account/reviews')
        } else {
            showNotification({ dispatch }, { severity: 'ERROR', message: 'Failed to delete your review.' })
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
        const { submitForm, isSubmitting } = props

        return (
            <Form className={ classes.root }>
                <Field
                    component={ TextField }
                    type="text"
                    name="title"
                    label="Title"
                    fullWidth
                />
                <Field
                    component={ TextField }
                    type="text"
                    name="content"
                    label="Content"
                    fullWidth
                    multiline
                    rows={ 10 }
                />
                <FormControl fullWidth>
                    <InputLabel htmlFor="rating">Rating</InputLabel>
                    <Field
                        component={ Select }
                        name="rating"
                        label="Rating"
                        fullWidth
                        inputProps={{
                            id: 'rating'
                        }}
                    >
                        <MenuItem value={ 1 }>1</MenuItem>
                        <MenuItem value={ 2 }>2</MenuItem>
                        <MenuItem value={ 3 }>3</MenuItem>
                        <MenuItem value={ 4 }>4</MenuItem>
                        <MenuItem value={ 5 }>5</MenuItem>
                        <MenuItem value={ 6 }>6</MenuItem>
                        <MenuItem value={ 7 }>7</MenuItem>
                        <MenuItem value={ 8 }>8</MenuItem>
                        <MenuItem value={ 9 }>9</MenuItem>
                        <MenuItem value={ 10 }>10</MenuItem>
                    </Field>
                </FormControl>
                <Button
                    onClick={ submitForm }
                    disabled={ isSubmitting }
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
                { renderDeleteButton() }
            </Form>
        )
    }

    return (
        <Formik
            initialValues={ initialValues }
            validationSchema={ VALIDATION.REVIEW }
            onSubmit={ onSubmit }
        >
            { renderForm }
        </Formik>
    )
}

export default ReviewForm
