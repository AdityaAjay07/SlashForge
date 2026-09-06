import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <h2>ClubApp</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <a href="/clubs">Clubs</a>
        <Link to="/organizer">Organizer</Link>
        <Link to="/organizer-login">Organizer</Link>
      </div>
    </nav>
  )
}

export default Navbar