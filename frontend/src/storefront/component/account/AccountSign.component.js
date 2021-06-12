import { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import SignUpForm from './SignUpForm.component'
import SignInForm from './SignInForm.component'

export function AccountSign() {
    const [step, setStep] = useState('SIGN_IN')

    const onCreateAccountClick = () => {
        setStep('SIGN_UP')
    }

    const onLoginIntoAccountClick = () => {
        setStep('SIGN_IN')
    }

    const renderSignIn = () => {
        return (
            <div>
                <SignInForm />
                <Typography>
                    Don't haven an account?
                </Typography>
                <Button
                    onClick={ onCreateAccountClick }
                    variant="contained"
                    color="primary"
                >
                    Create an account
                </Button>
            </div>
        )
    }

    const renderSignUp = () => {
        return (
            <div>
                <SignUpForm />
                <Typography>
                    Already have an account?
                </Typography>
                <Button
                    onClick={ onLoginIntoAccountClick }
                    variant="contained"
                    color="primary"
                >
                    Login into account
                </Button>
            </div>
        )
    }

    const stepRenderMap = {
        'SIGN_IN': renderSignIn,
        'SIGN_UP': renderSignUp
    }

    return stepRenderMap[step]()
}

export default AccountSign
