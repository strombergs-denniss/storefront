import { Grid, Typography } from '@material-ui/core'
import { useState } from 'react'
import CheckoutShippingStep from '../component/checkout/CheckoutShippingStep.component'
import CheckoutSummary from '../component/checkout/CheckoutSummary.component'
import CheckoutBillingStep from '../component/checkout/CheckoutBillingStep.component'
import CheckoutSuccessStep from '../component/checkout/CheckoutSuccessStep.component'
import { useSelector } from 'react-redux'

export function Checkout() {
    const { items } = useSelector((state) => state.CartReducer)
    const [step, setStep] = useState('SHIPPING')

    const renderShippingStep = () => {
        return (
            <Grid container spacing={ 4 }>
                <Grid item xs={ 7 }>
                    <CheckoutShippingStep setStep={ setStep } />
                </Grid>
                <Grid item xs={ 5 }>
                    <CheckoutSummary />
                </Grid>
            </Grid>
        )
    }

    const renderBillingStep = () => {
        return (
            <Grid container spacing={ 4 }>
                <Grid item xs={ 7 }>
                    <CheckoutBillingStep setStep={ setStep } />
                </Grid>
                <Grid item xs={ 5 }>
                    <CheckoutSummary />
                </Grid>
            </Grid>
        )
    }

    const renderSuccessStep = () => {
        return (
            <CheckoutSuccessStep />
        )
    }

    const stepRenderMap = {
        'SHIPPING': renderShippingStep,
        'BILLING': renderBillingStep,
        'SUCCESS': renderSuccessStep
    }

    if (!Object.keys(items).length) {
        return (
            <Typography>Empty cart!</Typography>
        )
    }

    return stepRenderMap[step]()
}

export default Checkout
