import MessagesList from 'MessagesList'
import NewMessageForm from 'NewMessageForm'
import { commandExist, executeCommand, isCommand } from 'helpers/commands'

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

    const { message, messages } = this.state
    const newState = { message: '' }

    if (isCommand(message)) {
      executeCommand(message)
    } else {
      newState.messages = [...messages, message]
    }

    this.setState(newState)
  }

  render () {
    const { message, messages } = this.state
    return (
      <div>
        <MessagesList messages={messages} />
        <NewMessageForm
          message={message}
          onChange={this.handleMessageInputChange}
          onSubmit={this.handleMessageFormSubmit}
        />
      </div>
    )
  }
}
