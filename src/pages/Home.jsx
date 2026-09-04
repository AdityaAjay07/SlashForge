import CategoryCard from '../components/CategoryCard'
import EventCard from '../components/EventCard'
import Hero from '../components/Hero'

function Home({ events, categories }) {
  return (
    <>
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
    </>
  )
}

export default Home