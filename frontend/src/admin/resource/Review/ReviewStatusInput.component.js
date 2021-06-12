import { SelectInput } from 'react-admin'

export const reviewStatusChoices = [
    {
        id: 'accepted',
        name: 'Accepted'
    },
    {
        id: 'rejected',
        name: 'Rejected'
    },
    {
        id: 'pending',
        name: 'Pending'
    }
]

export function ReviewStatusInput(props) {
    return (
        <SelectInput { ...props } source='status' choices={ reviewStatusChoices } />
    )
}

export default ReviewStatusInput
