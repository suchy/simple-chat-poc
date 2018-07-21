import MessagesList from 'MessagesList'

export default class Application extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      message: '',
      messages: []
    }

    this.handleMessageInputChange = this.handleMessageInputChange.bind(this)
    this.handleMessageFormSubmit = this.handleMessageFormSubmit.bind(this)
  }

  handleMessageInputChange (e) {
    this.setState({ message: e.target.value })
  }

  handleMessageFormSubmit (e) {
    e.preventDefault()

    this.setState({
      messages: [...this.state.messages, this.state.message],
      message: ''
    })
  }

  render () {
    const { message, messages } = this.state
    return (
      <div>
        <MessagesList messages={messages} />

        <form onSubmit={this.handleMessageFormSubmit}>
          <input type='text' value={message} onChange={this.handleMessageInputChange} />
          <button type='submit'>Send</button>
        </form>
      </div>
    )
  }
}
