import { useState } from 'react'
import { ReferenceInput, SelectInput, SimpleForm, useCreate, useRefresh } from 'react-admin'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export function ProductCategoryCreateButton(props) {
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
        const productCategory = { product_id: id, category_id: test.category_id }

        create('ProductCategory', productCategory)

        if (!error && !loading) {
            handleClose()
            refresh()
        }
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={ handleClickOpen }>
                Add category
            </Button>
            <Dialog
                open={ open }
                onClose={ handleClose }
            >
                <DialogTitle id="alert-dialog-title">Select category</DialogTitle>
                <DialogContent>
                    <SimpleForm resource="ProductCategory" save={ onSave }>
                        <ReferenceInput source="category_id" reference="Category">
                            <SelectInput source="id" optionText="name" />
                        </ReferenceInput>
                    </SimpleForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductCategoryCreateButton
