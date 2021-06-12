import { DateInput, Edit, NumberInput, ReferenceField, SimpleForm, TextInput } from 'react-admin'
import ReviewStatusInput from './ReviewStatusInput.component'
import CustomerField from '../Customer/CustomerField.component'

export function ReviewEdit(props) {
    return (
        <Edit { ...props }>
            <SimpleForm>
                <TextInput source="id" disabled fullWidth />
                <ReviewStatusInput fullWidth />
                <DateInput source="date" disabled fullWidth />
                <TextInput source="title" disabled fullWidth />
                <TextInput source="content" disabled fullWidth />
                <NumberInput source="rating" disabled min={ 1 } max={ 10 } fullWidth />
                <ReferenceField source="customer_id" reference="Customer" fullWidth>
                    <CustomerField />
                </ReferenceField>
            </SimpleForm>
        </Edit>
    )
}

export default ReviewEdit
