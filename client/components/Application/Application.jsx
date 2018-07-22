import MessagesList from 'MessagesList'
import NewMessageForm from 'NewMessageForm'
import Header from 'Header'
import { executeCommand, isCommand } from 'helpers/commands'
import socketIoClient from 'socket.io-client/dist/socket.io'
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
    this.addMessage = this.addMessage.bind(this)

    this.socket = socketIoClient('/')
  }

  componentDidMount () {
    // setInterval(() => this.socket.emit('message', {
    //   content: 'fdsfnasfnl klas',
    //   author: 'Suchy',
    //   type: 'message'
    // }), 5000)
    this.socket.on('message', this.addMessage)
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
    const newMessage = { author: nick, content: message, type: 'message' }
    // isCommand(message) ? executeCommand(message) : this.addMessage(newMessage)
    this.socket.emit('message', newMessage)
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
