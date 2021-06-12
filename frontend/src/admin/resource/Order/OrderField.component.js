export function OrderField(props) {
    const { record } = props

    if (!record) {
        return null
    }

    const { reference } = record

    return (
        <div>
            { reference }
        </div>
    )
}

export default OrderField
