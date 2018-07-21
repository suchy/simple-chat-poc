import './NewMessageForm.sass'

const NewMessageForm = ({ message, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className='messages_form'>
    <input
      autoFocus
      className='messages_form-input'
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
