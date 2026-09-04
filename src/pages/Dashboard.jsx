import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Dashboard({ events }) {
  const [stats, setStats] = useState({})

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')

      if (error) {
        console.error('Error fetching registrations:', error)
        return
      }

      const grouped = {}
      data.forEach((reg) => {
        if (!grouped[reg.event_id]) {
          grouped[reg.event_id] = { registered: 0, attended: 0 }
        }
        grouped[reg.event_id].registered += 1
        if (reg.attended) {
          grouped[reg.event_id].attended += 1
        }
      })

      setStats(grouped)
    }

    fetchStats()
  }, [])

  return (
    <div style={{ padding: '60px' }}>
      <h1>Organizer Dashboard</h1>

      <div style={{ marginTop: '24px' }}>
        {events.map((event) => {
          const eventStats = stats[event.id] || { registered: 0, attended: 0 }

          return (
            <div
              key={event.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px'
              }}
            >
              <h3>{event.title}</h3>
              <p>📅 {event.date}</p>
              <p>Registered: {eventStats.registered}</p>
              <p>Attended: {eventStats.attended}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard