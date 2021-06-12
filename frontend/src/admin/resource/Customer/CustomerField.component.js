export function CustomerField(props) {
    const { record } = props

    if (!record) {
        return null
    }

    const { firstName, lastName } = record

    return (
        <div>
            { `${ firstName } ${ lastName }` }
        </div>
    )
}

export default CustomerField
