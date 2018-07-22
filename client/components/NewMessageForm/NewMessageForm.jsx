import './NewMessageForm.sass'

const NewMessageForm = ({ message, nick, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className='messages_form'>
    <label htmlFor='new_message'>{nick}:</label>
    <input
      autoFocus
      className='messages_form-input'
      id='new_message'
      onChange={onChange}
      type='text'
      value={message}
    />
    <button type='submit' className='messages_form-button'>Send</button>
  </form>
)

NewMessageForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default NewMessageForm
