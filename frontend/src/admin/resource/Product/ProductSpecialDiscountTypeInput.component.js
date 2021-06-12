import { SelectInput } from 'react-admin'

export const productSpecialDiscountTypeChoices = [
    {
        id: 'percentage',
        name: 'Percentage'
    },
    {
        id: 'amount',
        name: 'Amount'
    }
]

export function ProductSpecialDiscountTypeInput(props) {
    return (
        <SelectInput { ...props } source='specialDiscountType' choices={ productSpecialDiscountTypeChoices } />
    )
}
