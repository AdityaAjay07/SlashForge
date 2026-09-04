import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <h2>ClubApp</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <a href="#clubs">Clubs</a>
        <a href="#signin">Sign In</a>
      </div>
    </nav>
  )
}

export default Navbar