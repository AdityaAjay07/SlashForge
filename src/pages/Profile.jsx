import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Profile.css';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    clubs_joined: 0,
    events_registered: 0,
    events_attended: 0
  });

  const currentUsername = sessionStorage.getItem('cet_student_username') || 'shreya_cs';

  useEffect(() => {
    fetchProfile();
  }, []);

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
        // Fallback or create default mock entry if none exists yet
        const defaultProfile = {
          username: currentUsername,
          name: 'Shreya Mohan',
          email: 'shreya@cet.ac.in',
          phone: '+91 9876543210',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
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
        template: upsert
        .upsert({
          username: currentUsername,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          avatar: profile.avatar,
          clubs_joined: profile.clubs_joined,
          events_registered: profile.events_registered,
          events_attended: profile.events_attended
        }, { onConflict: 'username' });

      if (error) throw error;
      setIsEditing(false);
      alert('Profile updated successfully in Supabase!');
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile from Supabase...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header-card">
        <img src={profile.avatar || 'https://via.placeholder.com/100'} alt="Avatar" className="profile-avatar" />
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p>{profile.email} • {profile.phone || 'No phone added'}</p>
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
          <h3>Edit Student Profile (Supabase Sync)</h3>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="student-input" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="student-input" required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="student-input" required />
          </div>
          <div className="form-group">
            <label>Profile Picture URL</label>
            <input type="url" value={profile.avatar} onChange={(e) => setProfile({...profile, avatar: e.target.value})} className="student-input" required />
          </div>
          <button type="submit" className="profile-save-btn">Save to Supabase</button>
        </form>
      )}
    </div>
  );
}