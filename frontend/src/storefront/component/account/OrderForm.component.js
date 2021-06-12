import { InputAdornment } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import moment from 'moment'
import { useSelector } from 'react-redux'

export function OrderForm(props) {
    const { order } = props
    const config = useSelector((state) => state.ConfigReducer)
    const initialValues = {
        ...order,
        date: moment(order.date).format('DD.MM.yyyy')
    }

    const renderForm = () => {
        return (
            <Form>
                <Field
                    component={ TextField }
                    type="text"
                    name="reference"
                    label="Reference"
                    fullWidth
                    disabled
                />
                <Field
                    component={ TextField }
                    type="text"
                    name="date"
                    label="Date"
                    fullWidth
                    disabled
                />
                <Field
                    component={ TextField }
                    type="text"
                    name="status"
                    label="Status"
                    fullWidth
                    disabled
                />
                <Field
                    component={ TextField }
                    type="text"
                    name="totalDelivery"
                    label="Total delivery"
                    fullWidth
                    disabled
                    InputProps={ { endAdornment: <InputAdornment position="end">{ config.currencySign }</InputAdornment> } }
                />
                <Field
                    component={ TextField }
                    type="text"
                    name="totalTax"
                    label="Total tax"
                    fullWidth
                    disabled
                    InputProps={ { endAdornment: <InputAdornment position="end">{ config.currencySign }</InputAdornment> } }
                />
                <Field
                    component={ TextField }
                    type="text"
                    name="subtotal"
                    label="Subtotal"
                    fullWidth
                    disabled
                    InputProps={ { endAdornment: <InputAdornment position="end">{ config.currencySign }</InputAdornment> } }
                />
                <Field
                    component={ TextField }
                    type="text"
                    name="total"
                    label="Total"
                    fullWidth
                    disabled
                    InputProps={ { endAdornment: <InputAdornment position="end">{ config.currencySign }</InputAdornment> } }
                />
            </Form>
        )
    }

    return (
        <Formik
            initialValues={ initialValues }
        >
            { renderForm }
        </Formik>
    )
}

export default OrderForm
