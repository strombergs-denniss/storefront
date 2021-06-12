import Tab from '@material-ui/core/Tab'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'
import { useState } from 'react'
import TabContext from '@material-ui/lab/TabContext'
import ProductDetails from './ProductDetails.component'
import ProductReviews from './ProductReviews.component'

export function ProductTabs(props) {
    const { product } = props
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <TabContext value={ value }>
            <TabList onChange={ handleChange } aria-label="tabs">
                <Tab label="Details" value="1" />
                <Tab label="Reviews" value="2" />
            </TabList>
            <TabPanel value="1">
                <ProductDetails product={ product } />
            </TabPanel>
            <TabPanel value="2">
                <ProductReviews product={ product } />
            </TabPanel>
        </TabContext>
    )
}

export default ProductTabs
