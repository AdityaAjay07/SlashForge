import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Clubs.css';

export default function Clubs() {
  const [clubsList, setClubsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback list featuring your exact clubs
  const fallbackClubs = [
    {
      id: 1,
      name: 'AstroCET',
      category: 'Astronomy & Science',
      description: 'The esteemed astronomy club of CET, embarking on stargazing sessions, astrophotography, and cosmic exploration.',
      image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
      members: '90+ Members'
    },
    {
      id: 2,
      name: 'VeloCET',
      category: 'Rocketry & Aerospace',
      description: 'CET’s pioneering student rocketry initiative, specializing in solid rocket motors, aerospace systems, and space tech.',
      image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
      members: '75+ Members'
    },
    {
      id: 3,
      name: 'CET Tunes',
      category: 'Music & Performance',
      description: 'The rhythmic heartbeat of campus—bringing together vocalists, instrumentalists, and music enthusiasts for unforgettable live jams.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      members: '120+ Members'
    },
    {
      id: 4,
      name: 'Dance Club',
      category: 'Arts & Culture',
      description: 'A vibrant community of street dancers, choreographers, and performers setting the stage on fire during annual fests.',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      members: '150+ Members'
    },
    {
      id: 5,
      name: 'Glitch',
      category: 'Game Development',
      description: 'CET’s premier game dev club combining creativity, coding, art, and storytelling to build immersive digital worlds.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      members: '100+ Members'
    }
  ];

  useEffect(() => {
    fetchClubs();
  }, []);

  async function fetchClubs() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('clubs').select('*');
      
      if (error || !data || data.length === 0) {
        setClubsList(fallbackClubs);
      } else {
        setClubsList(data);
      }
    } catch (error) {
      setClubsList(fallbackClubs);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="clubs-page">
      <main className="clubs-main">
        
        {/* Page Header */}
        <div className="clubs-header">
          <h1>Campus Clubs</h1>
          <p>Explore student organizations, technical societies, and creative communities at CET.</p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="loading-text">Loading clubs...</div>
        ) : (
          /* Cards Grid */
          <div className="clubs-grid">
            {clubsList.map((club) => (
              <div key={club.id || club.name} className="club-card">
                
                {/* Image Banner */}
                <div className="club-image-container">
                  <img 
                    src={club.image} 
                    alt={club.name}
                    className="club-image"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <span className="club-category">{club.category}</span>
                </div>

                {/* Content */}
                <div className="club-content">
                  <h2 className="club-title">{club.name}</h2>
                  <p className="club-description">{club.description}</p>

                  {/* Footer with Member Count & Button */}
                  <div className="club-footer">
                    <span className="club-members">👥 {club.members}</span>
                    <button className="club-btn">View More</button>
                  </div>
                </div>

              </div>
            ))}

            {/* View All Card placed right after the last club card */}
            <div className="view-all-card">
              <h3 className="view-all-title">Discover More</h3>
              <p className="view-all-text">Explore all registered technical and cultural societies on campus.</p>
              <button className="club-btn">View All</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}