import { IconButton } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { useRecordContext, showNotification } from 'react-admin'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import { useState } from 'react'
import { AttributeTypeInput } from './AttributeTypeInput.component'
import { useDispatch } from 'react-redux'

const selectTypes = [
    'select_number',
    'select_string'
]

const typeMap = {
    'select_number': 'number',
    'select_string': 'string'
}

export function AttributeOptionsInput(props) {
    const { test } = props
    const dispatch = useDispatch()
    const { attributeOptions: recordAttributeOptions = [], type: recordType } = useRecordContext()
    const [attributeOptions, setAttributeOptions] = useState(recordAttributeOptions)
    const [type, setType] = useState(recordType)
    const [selection, setSelection] = useState([])
    const [columns, setColumns] = useState([
        {
            field: 'value',
            headerName: 'Value',
            editable: true,
            type: typeMap[type],
            width: 400
        }
    ])

    const setAllAttributeOptions = (attributeOptions) => {
        setAttributeOptions(attributeOptions)
        test(attributeOptions)
    }

    const onTypeChange = (event) => {
        const { target: { value } } = event
        const newColumns = [...columns]
        newColumns[0].type = typeMap[value]
        setColumns(newColumns)
        setType(value)
        setAllAttributeOptions([])
    }

    const onAddButtonClick = () => {
        const containsNull = attributeOptions.some((option) => !option.value)

        if (containsNull) {
            dispatch(showNotification('All values must be defined.', 'error'))
            return
        }

        const newAttributeOptions = [
            ...attributeOptions,
            {
                value: null
            }
        ]

        setAllAttributeOptions(newAttributeOptions)
    }

    const onRemoveButtonClick = () => {
        const newAttributeOptions = []

        attributeOptions.forEach((option, index) => {
            if (selection.indexOf(index) < 0) {
                newAttributeOptions.push(option)
            }
        })

        setSelection([])
        setAllAttributeOptions(newAttributeOptions)
    }

    const onSelectionModelChange = ({ selectionModel }) => {
        setSelection(selectionModel)
    }

    const onEditCellChangeCommitted = ({ id, props: { value } }) => {
        const containsDuplicate = attributeOptions.find((option) => option.value == value)

        if (containsDuplicate && attributeOptions.indexOf(containsDuplicate) != id) {
            dispatch(showNotification('All values must be unique.', 'error'))
        }

        if (!value) {
            dispatch(showNotification('All values must be defined.', 'error'))
        }

        const newAttributeOptions = attributeOptions.map((option, index) => {
            return (
                index == id ? { ...option, value: (containsDuplicate && value != option.value) || !value ? option.value : value } : option
            )
        })
        
        setAllAttributeOptions(newAttributeOptions)
    }

    const renderRemoveButton = (params) => {
        if (!selection.length) {
            return null
        }
        
        return (
            <IconButton onClick={ onRemoveButtonClick }>
                <DeleteIcon />
            </IconButton>
        )
    }

    const renderDataGrid = () => {
        if (selectTypes.indexOf((type)) < 0) {
            return null
        }

        return(
            <>
                <IconButton onClick={ onAddButtonClick }>
                    <AddIcon />
                </IconButton>
                { renderRemoveButton() }
                <DataGrid
                    columns={ columns }
                    rows={ attributeOptions.map((option, id) => ({ id, ...option })) }
                    checkboxSelection
                    autoHeight
                    hideFooterPagination
                    disableColumnMenu
                    onSelectionModelChange={ onSelectionModelChange }
                    onEditCellChangeCommitted={ onEditCellChangeCommitted }
                    selectionModel={ selection }
                />
            </>
        )
    }

    return (
        <>
            <AttributeTypeInput onChange={ onTypeChange } fullWidth { ...props } />
            { renderDataGrid() }
        </>
    )
}

export default AttributeOptionsInput
