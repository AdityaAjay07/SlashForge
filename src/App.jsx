import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EventCard from './components/EventCard'
import CategoryCard from './components/CategoryCard'
import Footer from './components/Footer'

import {
  Laptop,
  Music,
  Trophy,
  Palette,
  BookOpen
} from 'lucide-react'

const events = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    title: "Tech Summit 2026",
    date: "September 15, 2026",
    location: "College of Engineering Trivandrum"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    title: "Music Fest 2026",
    date: "October 2, 2026",
    location: "Open Air Auditorium"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
    title: "Campus Hackathon",
    date: "October 18, 2026",
    location: "CET Innovation Centre"
  }
]

const categories = [
  { id: 1, icon: Laptop, name: "Technology" },
  { id: 2, icon: Music, name: "Cultural" },
  { id: 3, icon: Trophy, name: "Sports" },
  { id: 4, icon: Palette, name: "Arts" },
  { id: 5, icon: BookOpen, name: "Workshops" }
]

function App() {
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