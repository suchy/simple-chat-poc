const Message = ({ author, content, currentUser, timestamp, type }) => {
  const classNames = [
    'messages_list-item',
    author === currentUser ? 'is-self' : 'is-others',
    type !== 'message' ? `is-${type}` : ''
  ]

  return (
    <li className={classNames.join(' ')} title={timestamp}>
      <span className='messages_list-item_body'>{content}</span>
    </li>
  )
}

Message.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['message', 'nick', 'think', 'oops', 'fadelast', 'highlight', 'countdown']).isRequired
}

export default Message
