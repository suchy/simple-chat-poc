const NewMessageForm = ({ message, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input type='text' value={message} onChange={onChange} />
    <button type='submit'>Send</button>
  </form>
)

NewMessageForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default NewMessageForm
