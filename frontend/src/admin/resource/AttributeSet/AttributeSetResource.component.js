import AttributeSetIcon from '@material-ui/icons/Bookmark'
import AttributeSetList from './AttributeSetList.component'
import AttributeSetCreate from './AttributeSetCreate.component'
import AttributeSetEdit from './AttributeSetEdit.component'

export const AttributeSetResource = {
    name: 'AttributeSet',
    options: { label: 'Attribute sets' },
    icon: AttributeSetIcon,
    list: AttributeSetList,
    create: AttributeSetCreate,
    edit: AttributeSetEdit
}

export default AttributeSetResource
