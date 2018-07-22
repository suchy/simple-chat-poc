import './Header.sass'

const Header = ({ nick }) => (
  <header className='header'>
    <h1 className='header-title'>Conversation with <span className='header-nick'>{nick}</span></h1>
  </header>
)

Header.propTypes = {
  nick: PropTypes.string.isRequired
}

export default Header
