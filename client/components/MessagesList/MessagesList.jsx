import Message from 'Message'
import './MessagesList.sass'

const MessagesList = ({ identifier, messages }) => (
  <ul className='messages_list'>
    {messages.map(({ author, content, timestamp, type }) => (
      <Message
        author={author}
        content={content}
        currentUser={identifier}
        key={timestamp}
        timestamp={timestamp}
        type={type}
      />
    ))}
  </ul>
)

MessagesList.propTypes = {
  messages: PropTypes.array
}

export default MessagesList
