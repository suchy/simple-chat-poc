import './MessagesList.sass'

const MessagesList = ({ messages }) => (
  <ul className='messages_list'>
    {messages.map((message) => (
      <li className='messages_list-item is-self' key={message}>
        <span className='messages_list-item_body'>{message}</span>
      </li>
    ))}
  </ul>
)

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string)
}

export default MessagesList
