import './Indicator.sass'

const Indicator = ({ isWriting, nick }) => {
  const classNames = ['indicator']
  isWriting && classNames.push('is-visible')

  return (
    <div className={classNames.join(' ')}>
      {nick ? `${nick} is typing...` : `Typing...`}
    </div>)
}

Indicator.propTypes = {
  isWriting: PropTypes.bool.isRequired,
  nick: PropTypes.string
}

export default Indicator
