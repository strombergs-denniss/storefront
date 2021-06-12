import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { Box, Button, Grid } from '@material-ui/core'
import SignUpForm from './SignUpForm.component'
import SignInForm from './SignInForm.component'
import { useSelector } from 'react-redux'

export function AccountOverlay() {
    const [step, setStep] = useState('SIGN_IN')
    const account = useSelector((state) => state.AccountReducer)

    const onCreateAccountClick = () => {
        setStep('SIGN_UP')
    }

    const onLoginIntoAccountClick = () => {
        setStep('SIGN_IN')
    }

    const renderSignIn = () => {
        return (
            <>
                <Grid item xs={ 12 }>
                    <SignInForm />
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography>
                        Don't haven an account?
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <Button
                        onClick={ onCreateAccountClick }
                        variant="contained"
                        color="primary"
                    >
                        Create an account
                    </Button>
                </Grid>
            </>
        )
    }

    const renderSignUp = () => {
        return (
            <>
                <Grid item xs={ 12 }>
                    <SignUpForm />
                </Grid>
                <Grid item xs={ 12 }>
                    <Typography>
                        Already have an account?
                    </Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <Button
                        onClick={ onLoginIntoAccountClick }
                        variant="contained"
                        color="primary"
                    >
                        Login into account
                    </Button>
                </Grid>
            </>
        )
    }

    const stepRenderMap = {
        'SIGN_IN': renderSignIn,
        'SIGN_UP': renderSignUp
    }

    const renderPopup = () => {
        return (
            <PopupState variant="popover" popupId="account-overlay">
                {(popupState) => (
                    <div>
                        <IconButton { ...bindTrigger(popupState) } aria-label="account" color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                        <Popover
                            { ...bindPopover(popupState) }
                            anchorReference="anchorPosition"
                            anchorPosition={ { top: 0, left: window.innerWidth } }
                            marginThreshold={ 0 }
                            PaperProps={ { style: { width: '500px', height: '100%', maxHeight: 'none' } } }
                        >
                            <Box padding={ 1 }>
                                <Grid container spacing={ 2 }>
                                    <Grid item xs={ 12 }>
                                        <Typography variant="h4">
                                            Account
                                        </Typography>
                                    </Grid>
                                    { stepRenderMap[step]() }
                                </Grid>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>
        )
    }

    const renderButton = () => {
        return (
            <IconButton href="/account" aria-label="account" color="inherit">
                <AccountCircleIcon />
            </IconButton>
        )
    }

    return account?.token ? renderButton() : renderPopup()
}

export default AccountOverlay
