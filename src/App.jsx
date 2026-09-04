import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EventCard from './components/EventCard'
import CategoryCard from './components/CategoryCard'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

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
    <div>
      <Navbar />
      <Hero />

      <section className="categories-section">
        <h2>Browse by Category</h2>

        <div className="category-list">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              name={category.name}
            />
          ))}
        </div>
      </section>

      <section className="events-section">
        <div className="section-header">
          <h2>Trending Events</h2>
          <a href="#">View All</a>
        </div>

        <div className="event-list">
          {events.map((event) => (
            <EventCard
              key={event.id}
              image={event.image}
              title={event.title}
              date={event.date}
              location={event.location}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App