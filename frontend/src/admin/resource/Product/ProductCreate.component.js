import { BooleanInput, Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required, ImageInput, ImageField } from 'react-admin'
import RichTextInput from 'ra-input-rich-text'
import { ProductSpecialDiscountTypeInput } from './ProductSpecialDiscountTypeInput.component'
import { CONFIG } from '../../../base/Config'
import { UPLOAD_MEDIA } from '../../../storefront/query/Product.query'
import { fetchGraphQl } from '../../../base/Utility'

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

export function ProductCreate(props) {
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

    return (
        <Create { ...props }>
            <SimpleForm>
                <TextInput source="urlKey" validate={ required() } fullWidth />
                <TextInput source="sku" validate={ required() } fullWidth />
                <BooleanInput source="isEnabled" fullWidth />
                <TextInput source="name" validate={ required() } fullWidth />
                <NumberInput source="price" validate={ required() } fullWidth />
                <NumberInput source="stockQuantity" validate={ required() } fullWidth />
                <ProductSpecialDiscountTypeInput fullWidth />
                <NumberInput source="specialDiscountValue" fullWidth />
                <NumberInput source="specialTaxRate" fullWidth />
                <TextInput source="shortDescription" fullWidth />
                <RichTextInput source="longDescription" fullWidth />
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
            </SimpleForm>
        </Create>
    )
}

export default ProductCreate
