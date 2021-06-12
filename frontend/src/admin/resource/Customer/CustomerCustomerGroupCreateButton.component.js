import { useState } from 'react'
import { ReferenceInput, SelectInput, SimpleForm, useCreate, useRefresh } from 'react-admin'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export function CustomerCustomerGroupCreateButton(props) {
    const [open, setOpen] = useState(false)
    const [create, { loading, error }] = useCreate()
    const refresh = useRefresh()

    const handleClickOpen = () => {
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
    }

    const onSave = (test) => {
        const { record: { id } } = props
        const customerCustomerGroup = { customer_id: id, customer_group_id: test.customer_group_id }

        create('CustomerCustomerGroup', customerCustomerGroup)

        if (!error && !loading) {
            handleClose()
            refresh()
        }
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={ handleClickOpen }>
                Add customer group
            </Button>
            <Dialog
                open={ open }
                onClose={ handleClose }
            >
                <DialogTitle id="alert-dialog-title">Select customer group</DialogTitle>
                <DialogContent>
                    <SimpleForm resource="CustomerCustomerGroup" save={ onSave }>
                        <ReferenceInput source="customer_group_id" reference="CustomerGroup">
                            <SelectInput source="id" optionText="name" />
                        </ReferenceInput>
                    </SimpleForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CustomerCustomerGroupCreateButton
