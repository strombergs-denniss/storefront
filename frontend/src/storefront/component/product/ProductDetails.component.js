import { Typography } from '@material-ui/core'

export function ProductDetails(props) {
    const { product: { longDescription, attributeSet = {}, attributeValues } } = props
    const { attributes = [] } = attributeSet || {}

    const groupAttributes = () => {
        const attributeGroups = {}

        for (const attributeCode in attributeValues) {
            const attributeValue = attributeValues[attributeCode]
            const attribute = attributes.find((attribute) => attribute.code == attributeCode )

            if (attribute) {
                if (!attributeGroups[attribute.attributeGroup]) {
                    attributeGroups[attribute.attributeGroup] = []
                }

                attributeGroups[attribute.attributeGroup].push({
                    ...attribute,
                    value: attributeValue
                })
            }
        }

        return attributeGroups
    }

    const attributeGroups = groupAttributes()

    const renderAttribute = (attribute) => {
        return (
            <div>
                <dt>
                    { attribute.label }
                </dt>
                <dd>
                    { attribute.value.toString() }
                </dd>
            </div>
        )
    }

    const renderAttributeGroup = (attributeGroup) => {
        return (
            <div>
                <h2>
                    { attributeGroup }
                </h2>
                <section>
                    { attributeGroups[attributeGroup].map(renderAttribute) }
                </section>
            </div>
        )
    }

    return (
        <div>
            <Typography>
                { longDescription }
            </Typography>
            <div>
                { Object.keys(attributeGroups).map(renderAttributeGroup) }
            </div>
        </div>
    )
}

export default ProductDetails
