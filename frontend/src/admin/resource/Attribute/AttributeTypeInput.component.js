import { SelectInput } from 'react-admin'

export const attributeTypeChoices = [
    {
        id: 'boolean',
        name: 'Boolean'
    },
    {
        id: 'number',
        name: 'Number'
    },
    {
        id: 'string',
        name: 'String'
    },
    {
        id: 'select_number',
        name: 'Select number'
    },
    {
        id: 'select_string',
        name: 'Select string'
    }
]

export function AttributeTypeInput(props) {
    return (
        <SelectInput { ...props } source='type' choices={ attributeTypeChoices } />
    )
}
