import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Users } from 'lucide-react';
import '../pages/Organizer.css';

// Expanded club data for rich scrolling experience
const CATEGORY_CLUBS = {
  Technology: [
    { name: 'Coding Club / FOSS', desc: 'Open-source software projects, hackathons, and web dev.', members: '250+ Members' },
    { name: 'IEEE Student Branch', desc: 'Technical workshops, paper presentations, and tech fests.', members: '400+ Members' },
    { name: 'Robotics & AI Club', desc: 'Hardware prototyping, AI models, and autonomous bots.', members: '180+ Members' },
    { name: 'Cyber Security Guild', desc: 'CTF competitions, ethical hacking, and network security.', members: '120+ Members' },
    { name: 'Cloud & DevOps Circle', desc: 'Kubernetes, AWS deployments, and cloud architecture.', members: '95+ Members' },
    { name: 'Mobile App Developers', desc: 'Cross-platform app building using Flutter and React Native.', members: '140+ Members' }
  ],
  Cultural: [
    { name: 'Choreography & Dance Crew', desc: 'Hip-hop, street dance, and fusion choreography.', members: '150+ Members' },
    { name: 'Music Society', desc: 'Acoustic bands, vocal performances, and jam sessions.', members: '200+ Members' },
    { name: 'Drama & Theatre Club', desc: 'Stage plays, street plays, and scriptwriting workshops.', members: '90+ Members' },
    { name: 'Eastern & Western Accents Band', desc: 'Instrumental orchestration and choir performances.', members: '110+ Members' },
    { name: 'Fashion & Styling Club', desc: 'Annual fashion show production, styling, and design.', members: '85+ Members' }
  ],
  Sports: [
    { name: 'Campus Football Club', desc: 'Inter-college leagues, daily practice, and tournaments.', members: '110+ Members' },
    { name: 'Badminton & Table Tennis Club', desc: 'Indoor racket sports and singles/doubles practice.', members: '130+ Members' },
    { name: 'Athletics & Fitness Guild', desc: 'Marathons, strength training, and track events.', members: '80+ Members' },
    { name: 'Basketball & Volleyball League', desc: 'Court tournaments and weekly scrimmage sessions.', members: '100+ Members' },
    { name: 'E-Sports & Gaming Guild', desc: 'Competitive VALORANT, FIFA, and strategy tournaments.', members: '220+ Members' }
  ],
  Arts: [
    { name: 'Fine Arts & Painting Society', desc: 'Canvas painting, digital illustration, and live sketching.', members: '95+ Members' },
    { name: 'Astrophotography & Media Club', desc: 'Night sky photography, video editing, and graphic design.', members: '140+ Members' },
    { name: 'Craft & Design Lab', desc: 'UI/UX design, origami, and event stage decor.', members: '70+ Members' },
    { name: 'Literary & Quiz Society', desc: 'Creative writing, quizzing leagues, and debates.', members: '115+ Members' },
    { name: 'Photography & Cinematography Club', desc: 'Short film making, DSLR handling, and event coverage.', members: '180+ Members' }
  ],
  Workshops: [
    { name: 'Entrepreneurship & Startup Cell', desc: 'Pitch competitions, eco-ventures, and business models.', members: '160+ Members' },
    { name: 'Public Speaking & Debating', desc: 'Elocution, Model UN, and soft skills training.', members: '100+ Members' },
    { name: 'Career Prep & Tech Writing', desc: 'Resume reviews, LaTeX formatting, and technical writing.', members: '210+ Members' },
    { name: 'Innovation & Patent Cell', desc: 'Guiding student prototypes, patents, and grants.', members: '75+ Members' }
  ]
};

function CategoryCard({ icon: Icon, name }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const clubsList = CATEGORY_CLUBS[name] || [
    { name: `${name} General Chapter`, desc: `Active campus community focused on ${name.toLowerCase()}.`, members: '100+ Members' }
  ];

  return (
    <>
      <div className="category-card" onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
        {Icon && <Icon className="category-icon" />}
        <p>{name}</p>
      </div>

      {isOpen && (
        <div className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <div>
                <h3>{name} Clubs</h3>
                <p>Scroll through active campus communities and organizations</p>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="club-list-scroll">
              {clubsList.map((club, idx) => (
                <div key={idx} className="club-card">
                  <div className="club-info">
                    <h4>{club.name}</h4>
                    <p>{club.desc}</p>
                    <span className="member-badge">
                      <Users size={13} /> {club.members}
                    </span>
                  </div>
                  <button className="join-btn" onClick={() => alert(`Viewing details for ${club.name}`)}>
                    View <ExternalLink size={14} />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default CategoryCard;