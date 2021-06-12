import parse from 'html-react-parser'
import GetBlock from '../../query/Block.query'

export function Block(props) {
    const { code } = props
    const block = GetBlock({ code })

    if (!block) {
        return null
    }

    const { content } = block

    return parse(content)
}

export default Block
