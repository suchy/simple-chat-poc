import { formatTime, getTimestamp } from 'helpers'
import WinkImage from './wink.svg'
import SmileImage from './smile.svg'
import './Message.sass'

const mapEmojij = (text) => {
  const icons = {
    '(wink)': WinkImage,
    '(smile)': SmileImage
  }

  return icons[text]
    ? <img src={icons[text]} alt={text} className='emoji' width='24' height='24' key={getTimestamp()} />
    : `${text} `
}

const Message = ({ author, content, timestamp, type, userIdentifier }) => {
  const classNames = [
    'message',
    author === userIdentifier ? 'is-self' : 'is-others',
    type !== 'message' ? `is-${type}` : ''
  ]

  const emojiContent = content.split(' ').map(mapEmojij)

  return (
    <li className={classNames.join(' ')} title={formatTime(timestamp)}>
      <span className='message-body'>{emojiContent}</span>
    </li>
  )
}

Message.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['message', 'nick', 'think', 'oops', 'fadelast', 'highlight', 'countdown']).isRequired,
  userIdentifier: PropTypes.string.isRequired
}

export default Message
