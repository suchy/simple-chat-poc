import MessagesList from 'MessagesList'
import NewMessageForm from 'NewMessageForm'
import Header from 'Header'
import { executeCommand, isCommand } from 'helpers/commands'
import './Application.sass'

export default class Application extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      message: '',
      messages: [],
      nick: 'Suchy',
      othersNick: 'Ewa'
    }

    this.handleMessageInputChange = this.handleMessageInputChange.bind(this)
    this.handleMessageFormSubmit = this.handleMessageFormSubmit.bind(this)
  }

  componentDidMount () {
    setInterval(() => this.addMessage({
      content: 'fdsfnasfnl klas',
      author: 'Suchy',
      timestamp: (new Date()).getTime().toString(),
      type: 'message'
    }), 5000)
  }

  addMessage (message) {
    this.setState({ messages: [...this.state.messages, message] })
  }

  handleMessageInputChange (e) {
    this.setState({ message: e.target.value })
  }

  handleMessageFormSubmit (e) {
    e.preventDefault()

    const { message, nick } = this.state
    const newMessage = { author: nick, content: message, timestamp: (new Date()).getTime().toString(), type: 'message' }
    isCommand(message) ? executeCommand(message) : this.addMessage(newMessage)
    this.setState({ message: '' })
  }

  render () {
    const { message, messages, nick, othersNick } = this.state

    return (
      <div className='chat'>
        <Header nick={othersNick} />
        <MessagesList messages={messages} />
        <NewMessageForm
          message={message}
          nick={nick}
          onChange={this.handleMessageInputChange}
          onSubmit={this.handleMessageFormSubmit}
        />
      </div>
    )
  }
}
