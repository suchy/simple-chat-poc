import uuid from 'uuid/v4'

const COMMANDS = ['nick', 'think', 'oops', 'fadelast', 'highlight', 'countdown']

export const fadeOutLastMessage = (messages) => {
  if (messages.length > 0) {
    messages[messages.length - 1].type = 'fadelast'
  }

  return messages
}

export const formatTime = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10))
  const hours = '0' + date.getHours()
  const minutes = '0' + date.getMinutes()
  return `${hours.substr(-2)}:${minutes.substr(-2)}`
}

export const getCommand = (message) => {
  const [command, ...args] = message.replace('/', '').split(' ')
  return COMMANDS.includes(command) && { type: command, content: args.join(' ') }
}

export const getIdentifier = () => {
  let userIdentifier = window.localStorage.getItem('userIdentifier')

  if (!userIdentifier) {
    userIdentifier = uuid()
    window.localStorage.setItem('userIdentifier', userIdentifier)
  }

  return userIdentifier
}

export const getTimestamp = () => (new Date()).getTime().toString()

export const removeAuthorLastMessage = (authorIdentifier, messages) => {
  const reversedMessages = messages.reverse()
  const index = reversedMessages.findIndex(({ author }) => author === authorIdentifier)
  index > -1 && reversedMessages.splice(index, 1)

  return reversedMessages.reverse()
}
