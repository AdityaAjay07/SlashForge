import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { User } from 'lucide-react'; // Make sure lucide-react is imported for the icon
import './Profile.css';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    clubs_joined: 0,
    events_registered: 0,
    events_attended: 0
  });

  const currentUsername = sessionStorage.getItem('cet_student_username') || 'student';
  const currentFullName = sessionStorage.getItem('cet_student_name') || 'Shreya Mohan';
  const currentEmail = sessionStorage.getItem('cet_student_email') || 'shreya@cet.ac.in';
  const currentPhone = sessionStorage.getItem('cet_student_phone') || '+91 9876543210';

  useEffect(() => {
    fetchProfile();
  }, [currentUsername]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('username', currentUsername)
        .single();

      if (data) {
        setProfile(data);
      } else {
        let allStudents = JSON.parse(localStorage.getItem('cet_all_students')) || [];
        const found = allStudents.find(s => s.username === currentUsername);

        const defaultProfile = {
          username: currentUsername,
          name: found ? found.fullName : currentFullName,
          email: found ? found.email : currentEmail,
          phone: found ? found.phone : currentPhone,
          clubs_joined: 2,
          events_registered: 3,
          events_attended: 1
        };
        setProfile(defaultProfile);
      }
    } catch (err) {
      console.error('Error fetching profile:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('student_profiles')
        .upsert({
          username: currentUsername,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          clubs_joined: profile.clubs_joined,
          events_registered: profile.events_registered,
          events_attended: profile.events_attended
        }, { onConflict: 'username' });

      if (error) throw error;
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header-card" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px' }}>
        
        {/* Clean Vector Icon Placeholder matching the second image style */}
        <div style={{
          width: '75px',
          height: '75px',
          borderRadius: '50%',
          backgroundColor: '#fff5f2',
          border: '2px solid #fbdad2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <User size={38} color="#e76f51" />
        </div>

        <div className="profile-info" style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.5rem', color: '#1a1a1a' }}>{profile.name}</h2>
          <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '0.95rem' }}>
            {profile.email} • {profile.phone}
          </p>
          <button onClick={() => setIsEditing(!isEditing)} className="profile-edit-btn">
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="profile-stats-grid">
        <div className="stat-card">
          <h3>{profile.clubs_joined}</h3>
          <p>Clubs Joined</p>
        </div>
        <div className="stat-card">
          <h3>{profile.events_registered}</h3>
          <p>Events Registered</p>
        </div>
        <div className="stat-card">
          <h3>{profile.events_attended}</h3>
          <p>Events Attended</p>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="profile-edit-form">
          <h3>Edit Student Profile</h3>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="student-input" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="student-input" required />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="text" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="student-input" required />
          </div>
          <button type="submit" className="profile-save-btn">Save Changes</button>
        </form>
      )}
    </div>
  );
}