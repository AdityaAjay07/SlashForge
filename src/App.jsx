import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Events from './pages/Events'

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
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App