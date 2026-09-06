import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function OrganizerLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()

    setMessage('Checking login...')

    const { data, error } = await supabase.rpc(
      'check_organizer_login',
      {
        input_username: username,
        input_password: password
      }
    )

    if (error) {
      console.error('Login error:', error)
      setMessage('Something went wrong. Please try again.')
      return
    }

    if (data === true) {
      localStorage.setItem('isOrganizerLoggedIn', 'true')

      navigate('/organizer')
    } else {
      setMessage('Invalid username or password.')
    }
  }

  return (
    <div style={{ padding: '60px', maxWidth: '400px' }}>
      <h1>Organizer Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default OrganizerLogin