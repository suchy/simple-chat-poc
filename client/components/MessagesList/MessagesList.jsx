const MessagesList = ({ messages }) => (
  <ul>
    {messages.map((message) => (
      <li key={message}>{message}</li>
    ))}
  </ul>
)

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string)
}

export default MessagesList
