import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Users, CheckCircle2 } from 'lucide-react'
import './Organizer.css' // Reusing our clean organizer stylesheet

function Dashboard({ events = [] }) {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')

      if (error) {
        console.error('Error fetching registrations:', error)
        setLoading(false)
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
      setLoading(false)
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="organizer-page" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading dashboard analytics...</p>
      </div>
    )
  }

  return (
    <div className="organizer-page">
      <div className="organizer-container" style={{ maxWidth: '800px' }}>
        
        {/* Back Button to Organizer Hub */}
        <Link to="/organizer" className="back-btn">
          <ArrowLeft size={16} /> Back to Organizer Tools
        </Link>

        <div className="organizer-header">
          <h2>Organizer Dashboard</h2>
          <p>Monitor real-time event sign-ups and attendance tracking metrics.</p>
        </div>

        {events.length === 0 ? (
          <div className="form-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#666', fontSize: '1.05rem' }}>No events available to display metrics for.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {events.map((event) => {
              const eventStats = stats[event.id] || { registered: 0, attended: 0 }

              return (
                <div key={event.id} className="form-card" style={{ padding: '24px 30px' }}>
                  
                  {/* Event Title & Date */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#1a1a1a', fontWeight: '700', margin: 0 }}>
                      {event.title}
                    </h3>
                    <span style={{ 
                      color: '#666', 
                      fontSize: '0.9rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      background: '#f8f9fa',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #eaeaea'
                    }}>
                      <Calendar size={14} color="#e76f51" /> {event.date}
                    </span>
                  </div>

                  {/* Metrics Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    
                    {/* Registered Badge */}
                    <div style={{ 
                      background: '#fff5f2', 
                      border: '1px solid #fbdad2', 
                      padding: '16px', 
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px'
                    }}>
                      <div style={{ background: '#e76f51', color: 'white', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                        <Users size={20} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 4px 0', fontWeight: '600' }}>Registered</p>
                        <p style={{ fontSize: '1.4rem', color: '#1a1a1a', margin: 0, fontWeight: '800' }}>{eventStats.registered}</p>
                      </div>
                    </div>

                    {/* Attended Badge */}
                    <div style={{ 
                      background: '#f0fdf4', 
                      border: '1px solid #bbf7d0', 
                      padding: '16px', 
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px'
                    }}>
                      <div style={{ background: '#22c55e', color: 'white', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: '#666', margin: '0 0 4px 0', fontWeight: '600' }}>Attended</p>
                        <p style={{ fontSize: '1.4rem', color: '#1a1a1a', margin: 0, fontWeight: '800' }}>{eventStats.attended}</p>
                      </div>
                    </div>

                  </div>

                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard