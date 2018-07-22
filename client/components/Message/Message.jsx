import './Message.sass'
const emojij = 'http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-11/256/winking-face.png'
import WinkImage from './wink.svg'
import SmileImage from './smile.svg'

const mapEmojij = (text) => {
  const icons = {
    '(wink)': WinkImage,
    '(smile)': SmileImage
  }

  return icons[text] ? <img src={icons[text]} alt={text} className='emoji' width='24' height='24' /> : `${text} `
}

const Message = ({ author, content, currentUser, timestamp, type }) => {
  const classNames = [
    'message',
    author === currentUser ? 'is-self' : 'is-others',
    type !== 'message' ? `is-${type}` : ''
  ]

  const emojiContent = content.split(' ').map(mapEmojij)

  return (
    <li className={classNames.join(' ')} title={timestamp}>
      <span className='message-body'>{emojiContent}</span>
    </li>
  )
}

Message.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  currentUser: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['message', 'nick', 'think', 'oops', 'fadelast', 'highlight', 'countdown']).isRequired
}

export default Message
