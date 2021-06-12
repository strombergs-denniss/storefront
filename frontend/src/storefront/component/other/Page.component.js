import parse from 'html-react-parser'
import GetPage from '../../query/Page.query'

export function Page(props) {
    const { urlKey } = props
    const page = GetPage({ urlKey })

    if (!page) {
        return null
    }

    const { content } = page

    return parse(content)
}

export default Page
