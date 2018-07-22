import './MessagesList.sass'

const MessagesList = ({ messages }) => (
  <ul className='messages_list'>
    {messages.map(({ author, content, timestamp }) => (
      <li className='messages_list-item is-self' key={timestamp}>
        <span className='messages_list-item_body'>{content}</span>
      </li>
    ))}
  </ul>
)

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['message', 'nick', 'think', 'oops', 'fadelast', 'highlight', 'countdown']).isRequired
  }))
}

export default MessagesList
