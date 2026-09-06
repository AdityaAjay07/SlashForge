import { Link } from 'react-router-dom'
import heroImage from '../assets/hero-illustration.svg'

function Hero() {
  return (
    <main className="hero-container">
      {/* Left Column: Text Content */}
      <div className="hero-content">
        <h1>Your Campus Events, All in One Place.</h1>
        <p>
          Discover events, connect with clubs, and never miss what's happening
          on campus.
        </p>
        <Link to="/events" style={{ textDecoration: 'none' }}>
          <button className="explore-events-btn">Explore Events</button>
        </Link>
      </div>

      {/* Right Column: Local Image Asset with Accurate Sizing */}
      <div className="hero-visual">
        <img 
          src={heroImage} 
          alt="Students at campus event" 
          className="hero-img"
          style={{ 
            width: '100%', 
            maxWidth: '480px', 
            height: 'auto',
            position: 'relative',
            top: '50px',     
            left: '40px'     
          }}
        />
      </div>
    </main>
  )
}

export default Hero