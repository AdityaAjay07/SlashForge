import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Scanner from './pages/Scanner'
import Dashboard from './pages/Dashboard'
import Organizer from './pages/Organizer'
import CreateEvent from './pages/CreateEvent'
import ManageEvents from './pages/ManageEvents'
import EditEvent from './pages/EditEvent'
import Clubs from './pages/Clubs';
import OrganizerLogin from './pages/OrganizerLogin'
import ProtectedRoute from './components/ProtectedRoute'

import {
  Laptop,
  Music,
  Trophy,
  Palette,
  BookOpen
} from 'lucide-react'

const categories = [
  { id: 1, icon: Laptop, name: "Technology" },
  { id: 2, icon: Music, name: "Cultural" },
  { id: 3, icon: Trophy, name: "Sports" },
  { id: 4, icon: Palette, name: "Arts" },
  { id: 5, icon: BookOpen, name: "Workshops" }
]

function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*')

      if (error) {
        console.error('Error fetching events:', error)
      } else {
        setEvents(data)
      }
    }

    fetchEvents()
  }, [])

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home events={events} categories={categories} />} />
        <Route path="/events" element={<Events events={events} />} />
        <Route path="/events/:id" element={<EventDetail events={events} />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/dashboard" element={<Dashboard events={events} />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
        {/* Public routes */}
        <Route
          path="/"
          element={<Home events={events} categories={categories} />}
        />

        <Route
          path="/events"
          element={<Events events={events} />}
        />

        <Route
          path="/events/:id"
          element={<EventDetail events={events} />}
        />

        {/* Organizer login */}
        <Route
          path="/organizer-login"
          element={<OrganizerLogin />}
        />

        {/* Protected organizer routes */}
        <Route
          path="/organizer"
          element={
            <ProtectedRoute>
              <Organizer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <Scanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard events={events} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-events"
          element={
            <ProtectedRoute>
              <ManageEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-event/:id"
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App