import { Price, roundPriceValue } from './Price.component'

export function ProductPrice(props) {
    const { product: { price, specialDiscountType, specialDiscountValue, specialTaxRate } = {} } = props
    const discountedPrice = roundPriceValue(specialDiscountType === 'percent' ? price - price * specialDiscountValue : price - specialDiscountValue)
    const originalPrice = roundPriceValue(price)

    const renderVat = () => {
        return (
            <span>
                { ` VAT ${ specialTaxRate }%` }
            </span>
        )
    }

    if (discountedPrice < originalPrice && discountedPrice > 0) {
        return (
            <div>
                <span>
                    <Price value={ discountedPrice } />
                </span>
                { ' ' }
                <del>
                    <Price value={ originalPrice } />
                </del>
                { renderVat() }
            </div>
        )
    }

    return (
        <div>
            <span>
                <Price value={ originalPrice } />
            </span>
            { renderVat() }
        </div>
    )
}

export default Price
