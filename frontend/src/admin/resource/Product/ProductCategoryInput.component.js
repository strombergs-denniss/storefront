import { Datagrid, DeleteButton, ReferenceField, ReferenceManyField, TextField } from 'react-admin'

export function ProductCategoryInput(props) {
    return (
        <ReferenceManyField
            source="id"
            target="product_id"
            reference="ProductCategory"
        >
            <Datagrid>
                <ReferenceField source="category_id" reference="Category">
                    <TextField source="name" />
                </ReferenceField>
                <DeleteButton redirect={ false } />
            </Datagrid>
        </ReferenceManyField>
    )
}

export default ProductCategoryInput
