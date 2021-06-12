import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

export function AddressField(props) {
    const { record } = props

    if (!record) {
        return null
    }

    const filteredRecord = [
        {
            key: 'Name',
            value: `${ record.firstName } ${ record.lastName }`
        },
        {
            key: 'Phone number',
            value: record.phoneNumber
        },
        {
            key: 'Country',
            value: record.country
        },
        {
            key: 'City',
            value: record.city
        },
        {
            key: 'Province',
            value: record.province
        },
        {
            key: 'Street1',
            value: record.street1
        },
        {
            key: 'Street2',
            value: record.street2
        },
        {
            key: 'Postal code',
            value: record.postalCode
        }
    ]

    const rows = filteredRecord.map((row, id) => ({ id, ...row }))

    return (
        <TableContainer>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell align="right">Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={ row.key }>
                        <TableCell>{ row.key }</TableCell>
                        <TableCell align="right">{ row.value }</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
      </TableContainer>
    )
}

export default AddressField
