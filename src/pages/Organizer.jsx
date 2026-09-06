import { Link, useNavigate } from 'react-router-dom'
import { QrCode, BarChart3, PlusCircle, Settings, LogOut } from 'lucide-react'
import './Organizer.css' 

function Organizer() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('isOrganizerLoggedIn')
    navigate('/')
  }

  return (
    <div className="organizer-page">
      <div className="organizer-container">
        
        {/* Header Section */}
        <div className="organizer-header">
          <h2>Organizer Tools</h2>
          <p>Manage campus events, track engagement, and check in attendees.</p>
        </div>

        {/* Tools Cards Grid */}
        <div className="tools-grid">
          <Link to="/scan" className="tool-card">
            <div className="tool-icon-wrapper">
              <QrCode size={26} />
            </div>
            <h3>Open QR Scanner</h3>
            <p>Scan student passes for instant check-ins.</p>
          </Link>

          <Link to="/dashboard" className="tool-card">
            <div className="tool-icon-wrapper">
              <BarChart3 size={26} />
            </div>
            <h3>View Dashboard</h3>
            <p>Monitor registrations and live attendance metrics.</p>
          </Link>

          <Link to="/create-event" className="tool-card highlight-card">
            <div className="tool-icon-wrapper">
              <PlusCircle size={26} />
            </div>
            <h3>Create Event</h3>
            <p>Publish a new club activity or workshop.</p>
          </Link>

          <Link to="/manage-events" className="tool-card">
            <div className="tool-icon-wrapper">
              <Settings size={26} />
            </div>
            <h3>Manage Events</h3>
            <p>Edit or delete your active campus events.</p>
          </Link>
        </div>

        {/* Logout Action */}
        <div className="logout-container">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>

      </div>
    </div>
  )
}

export default Organizer