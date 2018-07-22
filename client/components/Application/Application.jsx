import Header from 'Header'
import MessagesList from 'MessagesList'
import NewMessageForm from 'NewMessageForm'
import Indicator from 'Indicator'
import { getCommand } from 'helpers/commands'
import socketIoClient from 'socket.io-client/dist/socket.io'
import './Application.sass'

const getTimestamp = () => (new Date()).getTime().toString()

export default class Application extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      message: '',
      messages: [],
      nick: window.localStorage.getItem('nick'),
      identifier: window.localStorage.getItem('identifier'),
      isWriting: false,
      othersNick: 'Ewa'
    }

    this.handleMessageInputChange = this.handleMessageInputChange.bind(this)
    this.handleMessageFormSubmit = this.handleMessageFormSubmit.bind(this)
    this.handleIncomingMessage = this.handleIncomingMessage.bind(this)
    this.handleWritingIndicator = this.handleWritingIndicator.bind(this)
    this.addMessage = this.addMessage.bind(this)

    this.socket = socketIoClient('/')
  }

  componentDidMount () {
    this.socket.on('message', this.handleIncomingMessage)
    this.socket.on('isWriting', this.handleWritingIndicator)
  }

  componentDidUpdate (prevProps, prevState) {
    const { identifier, message } = this.state
    !!prevState.message !== !!message && this.socket.emit('isWriting', { identifier, isWriting: !!message })
  }

  handleIncomingMessage (message) {
    if (!message || !message.type) return false;

    ['highlight', 'message', 'think'].includes(message.type) && this.addMessage(message)
    message.type === 'oops' && this.removeAuthorLastMessage(message.author)
    message.type === 'fadelast' && this.fadeOut()
    message.type === 'countdown' && this.countdown(message)
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

  handleWritingIndicator (e) {
    const { identifier, isWriting } = this.state
    e.identifier !== identifier && e.isWriting !== isWriting && this.setState({ isWriting: e.isWriting })
  }

  addMessage (message) {
    this.setState({ messages: [...this.state.messages, message] })
  }

  countdown (message) {
    if (message.author === this.state.identifier) {
      return
    }

    const [time, url] = message.content.split(' ')

    if (!time || !url) {
      return
    }

    let count = time

    const countdown = setInterval(() => {
      const newMessage = { ...message, type: 'message', content: count.toString(), timestamp: getTimestamp() }

      if (count === 0) {
        clearInterval(countdown)
        window.open(url)
        newMessage.content = `Opening new window and redirecting to ${url}...`
      }

      this.addMessage(newMessage)

      count--
    }, 1000)
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
    const { message, messages, identifier, nick, othersNick, isWriting } = this.state

    return (
      <div className='chat'>
        <Header nick={othersNick} />

        <MessagesList messages={messages} identifier={identifier} />

        <Indicator isWriting={isWriting} />

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
