import { BooleanInput, Edit, NumberInput, SimpleForm, TextInput, ImageField, ImageInput, Toolbar, useUpdate, useRefresh, required, ReferenceInput, SelectInput } from 'react-admin'
import RichTextInput from 'ra-input-rich-text'
import { ProductSpecialDiscountTypeInput } from './ProductSpecialDiscountTypeInput.component'
import ProductAttributeValuesInput from './ProductAttributeValuesInput.component'
import ProductCategoryInput from './ProductCategoryInput.component'
import ProductCategoryCreateButton from './ProductCategoryCreateButton.component'
import { useState } from 'react'
import { UPLOAD_MEDIA } from '../../../storefront/query/Product.query'
import { toBase64 } from './ProductCreate.component'
import { fetchGraphQl } from '../../../base/Utility'

export function ProductEdit(props) {
    const [attributeValues, setAttributeValues] = useState(null)
    const [update, { loading, error }] = useUpdate()
    const refresh = useRefresh()

    const onSave = (data) => {
        const newData = {
            ...data,
            attributeValues: attributeValues ? attributeValues : data.attributeValues
        }

        update('Product', data.id, newData)

        if (!error && !loading) {
            refresh()
        }
    }

    const getFilesFromEvent = async (event) => {
        const [file] = event.dataTransfer ? event.dataTransfer.files : event.target.files

        if (!file.type.startsWith('image/')) {
            return []
        }

        const base64 = await toBase64(file).catch(e => Error(e))
        const url = await fetchGraphQl(UPLOAD_MEDIA, { data: base64, name: file.name }, 'url', 'ADMIN')

        return [{
            url,
            type: file.type
        }]
    }

    const validate = (attributeValues) => {
        setAttributeValues(attributeValues)
    }

    return (
        <Edit { ...props }>
            <SimpleForm save={ onSave } toolbar={ <Toolbar alwaysEnableSaveButton /> }>
                <TextInput source="id" disabled fullWidth />
                <TextInput source="urlKey" validate={ required() } fullWidth />
                <TextInput source="sku" validate={ required() } fullWidth />
                <BooleanInput source="isEnabled" fullWidth />
                <TextInput source="name" validate={ required() } fullWidth />
                <NumberInput source="price" validate={ required() } fullWidth />
                <NumberInput source="stockQuantity" validate={ required() } fullWidth />
                <NumberInput source="soldAmount" disabled fullWidth />
                <ProductSpecialDiscountTypeInput fullWidth />
                <NumberInput source="specialDiscountValue" fullWidth />
                <NumberInput source="specialTaxRate" fullWidth />
                <TextInput source="shortDescription" fullWidth />
                <RichTextInput source="longDescription" />
                <ImageInput source="baseImage" options={ { getFilesFromEvent } } accept="image/*">
                    <ImageField source="url" />
                </ImageInput>
                <ImageInput source="thumbnailImage" options={ { getFilesFromEvent } } accept="image/*">
                    <ImageField source="url" />
                </ImageInput>
                <ImageInput source="otherImages" multiple options={ { getFilesFromEvent } } accept="image/*">
                    <ImageField source="url" />
                </ImageInput>
                <ReferenceInput source="attribute_set_id" reference="AttributeSet" validate={ required() } fullWidth>
                    <SelectInput source="name" />
                </ReferenceInput>
                <ProductAttributeValuesInput attributeValues={ attributeValues } validate={ validate } />
                <ProductCategoryCreateButton />
                <ProductCategoryInput />
            </SimpleForm>
        </Edit>
    )
}

export default ProductEdit
