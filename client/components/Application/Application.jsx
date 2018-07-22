import MessagesList from 'MessagesList'
import NewMessageForm from 'NewMessageForm'
import Header from 'Header'
import { getCommand } from 'helpers/commands'
import socketIoClient from 'socket.io-client/dist/socket.io'
import './Application.sass'

export default class Application extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      message: '',
      messages: [],
      nick: window.localStorage.getItem('nick'),
      identifier: window.localStorage.getItem('identifier'),
      othersNick: 'Ewa'
    }

    this.handleMessageInputChange = this.handleMessageInputChange.bind(this)
    this.handleMessageFormSubmit = this.handleMessageFormSubmit.bind(this)
    this.handleIncomingMessage = this.handleIncomingMessage.bind(this)
    this.addMessage = this.addMessage.bind(this)

    this.socket = socketIoClient('/')
  }

  componentDidMount () {
    this.socket.on('message', this.handleIncomingMessage)
  }

  handleIncomingMessage (message) {
    if (!message || !message.type) return false;

    ['highlight', 'message', 'think'].includes(message.type) && this.addMessage(message)
    message.type === 'oops' && this.removeAuthorLastMessage(message.author)
    message.type === 'fadelast' && this.fadeOut()
  }

  handleMessageInputChange (e) {
    this.setState({ message: e.target.value })
  }

  handleMessageFormSubmit (e) {
    e.preventDefault()

    const { message, identifier } = this.state
    const command = getCommand(message)
    const newMessage = { author: identifier, content: message, type: 'message' }

    if (command) {
      newMessage.content = command.content
      newMessage.type = command.type
    }

    this.socket.emit('message', newMessage)
    this.setState({ message: '' })
  }

  addMessage (message) {
    this.setState({ messages: [...this.state.messages, message] })
  }

  fadeOut () {
    const { messages } = this.state

    if (messages.length > 0) {
      messages[messages.length - 1].type = 'fadelast'
    }

    this.setState({ messages })
  }

  removeAuthorLastMessage (identifier) {
    const { messages } = this.state

    const reversedMessages = messages.reverse()
    const index = reversedMessages.findIndex(({ author }) => author === identifier)

    if (index > -1) {
      reversedMessages.splice(index, 1)
      this.setState({ messages: reversedMessages.reverse() })
    }
  }

  render () {
    const { message, messages, identifier, nick, othersNick } = this.state

    return (
      <div className='chat'>
        <Header nick={othersNick} />
        <MessagesList messages={messages} identifier={identifier} />
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
