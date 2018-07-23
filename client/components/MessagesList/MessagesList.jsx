import { findDOMNode } from 'react-dom'
import Message from 'Message'
import './MessagesList.sass'

class MessagesList extends React.Component {
  constructor (props) {
    super(props)
    this.listEl = React.createRef()
  }

  componentDidMount () {
    this.listNode = findDOMNode(this.listEl.current)
  }

  componentDidUpdate (prevProps) {
    if (this.props.messages.length !== prevProps.messages.length) {
      this.listNode.scrollTop = this.listNode.scrollHeight
    }
  }

  render () {
    const { userIdentifier, messages } = this.props

    return (
      <ul className='messages_list' ref={this.listEl}>
        {messages.map(({ author, content, timestamp, type }) => (
          <Message
            author={author}
            content={content}
            key={timestamp}
            timestamp={timestamp}
            type={type}
            userIdentifier={userIdentifier}
          />
        ))}
      </ul>
    )
  }
}

MessagesList.propTypes = {
  userIdentifier: PropTypes.string,
  messages: PropTypes.array
}

export default MessagesList
