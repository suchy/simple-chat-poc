import './Header.sass'

const Header = ({ nick }) => (
  <header className='header'>
    <h1 className='header-title'>{nick}:</h1>
  </header>
)

Header.propTypes = {
  nick: PropTypes.string.isRequired
}

export default Header
