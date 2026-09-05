import { Link } from 'react-router-dom'

function Organizer() {
  return (
    <div style={{ padding: '60px' }}>
      <h1>Organizer Tools</h1>
      <p>Manage events and check in attendees.</p>

      <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
        <Link to="/scan">
          <button>Open QR Scanner</button>
        </Link>
        
        <Link to="/dashboard">
          <button>View Dashboard</button>
        </Link>

        <Link to="/create-event">
          <button>Create Event</button>
        </Link>

        <Link to="/manage-events">
          <button>Manage Events</button>
        </Link>
        
      </div>
    </div>
  )
}

export default Organizer