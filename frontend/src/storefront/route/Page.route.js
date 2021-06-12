import { useParams } from 'react-router-dom'
import {Page as PageComponent } from '../component/other/Page.component'

export function Page() {
    const { urlKey } = useParams()

    return (
        <div>
            <PageComponent urlKey={ urlKey } />
        </div>
    )
}

export default Page
