import './Indicator.sass'

const Indicator = ({ isWriting }) => {
  const classNames = ['indicator']
  isWriting && classNames.push('is-visible')
  return (<div className={classNames.join(' ')}>Someone is writing...</div>)
}

Indicator.propTypes = {
  isWriting: PropTypes.bool.isRequired
}

export default Indicator
