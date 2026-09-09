import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, LogIn, ArrowLeft, UserPlus, BookOpen, Layers, Mail, Phone } from 'lucide-react';
import './StudentLogin.css';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  
  // Form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    let students = JSON.parse(localStorage.getItem('cet_all_students')) || [];

    if (isSignUpMode) {
      if (!fullName.trim() || !username.trim() || !password || !email.trim() || !phone.trim()) {
        setError('Please fill in all required fields, including email and mobile number.');
        return;
      }

      // Check if username is already taken
      const existing = students.find(s => s.username.toLowerCase() === username.trim().toLowerCase());
      if (existing) {
        setError('Username is already taken. Please choose a unique one.');
        return;
      }

      // Create new student profile object
      const newStudent = {
        username: username.trim(),
        password: password,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        department: department.trim() || 'Computer Science and Engineering',
        semester: semester.trim() || 'S2',
        avatar: 'https://via.placeholder.com/150/e76f51/ffffff?text=User' // Common placeholder
      };

      students.push(newStudent);
      localStorage.setItem('cet_all_students', JSON.stringify(students));

      alert('Account created successfully! Please sign in with your credentials.');
      setIsSignUpMode(false);
      setPassword('');
      return;
    }

    // --- LOGIN LOGIC ---
    if (username.trim() === 'student' && password === 'student123') {
      sessionStorage.setItem('cet_student_auth', 'true');
      sessionStorage.setItem('cet_student_username', 'student');
      sessionStorage.setItem('cet_student_name', 'Shreya Mohan');
      sessionStorage.setItem('cet_student_email', 'shreya@cet.ac.in');
      sessionStorage.setItem('cet_student_phone', '+91 9876543210');
      sessionStorage.setItem('cet_student_dept', 'Computer Science and Engineering');
      sessionStorage.setItem('cet_student_sem', 'S2');
      navigate('/student-home');
      return;
    }

    const foundStudent = students.find(
      s => s.username.toLowerCase() === username.trim().toLowerCase() && s.password === password
    );

    if (foundStudent) {
      sessionStorage.setItem('cet_student_auth', 'true');
      sessionStorage.setItem('cet_student_username', foundStudent.username);
      sessionStorage.setItem('cet_student_name', foundStudent.fullName);
      sessionStorage.setItem('cet_student_email', foundStudent.email);
      sessionStorage.setItem('cet_student_phone', foundStudent.phone);
      sessionStorage.setItem('cet_student_dept', foundStudent.department);
      sessionStorage.setItem('cet_student_sem', foundStudent.semester);
      navigate('/student-home');
    } else {
      setError('Invalid username or password.');
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsSignUpMode(!isSignUpMode);
    setError('');
    setPassword('');
  };

  return (
    <div className="organizer-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
      <div className="organizer-container" style={{ width: '100%', maxWidth: '440px' }}>
        
        <Link to="/" className="back-btn" style={{ marginBottom: '16px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="form-card" style={{ padding: '40px 30px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ 
              background: '#fff5f2', 
              color: '#e76f51', 
              width: '56px', 
              height: '56px', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 12px rgba(231, 111, 81, 0.1)'
            }}>
              {isSignUpMode ? <UserPlus size={26} /> : <User size={26} />}
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#1a1a1a', fontWeight: '800', marginBottom: '6px' }}>
              {isSignUpMode ? 'Student Sign Up' : 'Student Portal'}
            </h2>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
              {isSignUpMode 
                ? 'Register your account to manage your profile and join campus clubs.' 
                : 'Sign in to access your profile, track registered events, and join campus clubs.'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            
            {isSignUpMode && (
              <>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={15} color="#e76f51" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    className="student-input" 
                    placeholder="e.g., Matthew" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={15} color="#e76f51" /> Email Address
                  </label>
                  <input 
                    type="email" 
                    className="student-input" 
                    placeholder="e.g., matt@cet.ac.in" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={15} color="#e76f51" /> Mobile Number
                  </label>
                  <input 
                    type="text" 
                    className="student-input" 
                    placeholder="e.g., +91 9876543210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={15} color="#e76f51" /> Department / Branch
                  </label>
                  <input 
                    type="text" 
                    className="student-input" 
                    placeholder="e.g., Computer Science & Engg" 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={15} color="#e76f51" /> Semester / Year
                  </label>
                  <input 
                    type="text" 
                    className="student-input" 
                    placeholder="e.g., S2" 
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={15} color="#e76f51" /> Username or Student ID
              </label>
              <input 
                type="text" 
                className="student-input" 
                placeholder="Enter unique username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={15} color="#e76f51" /> Password
              </label>
              <input 
                type="password" 
                className="student-input" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{ 
                marginBottom: '20px', 
                padding: '10px 14px', 
                borderRadius: '8px', 
                background: '#fff5f5',
                border: '1px solid #ffccd5',
                color: '#d90429',
                fontSize: '0.9rem',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <button type="submit" className="primary-btn" style={{ width: '100%' }}>
              {isSignUpMode ? <UserPlus size={18} /> : <LogIn size={18} />} 
              {isSignUpMode ? 'Create Student Account' : 'Login to Portal'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
            {isSignUpMode ? 'Already have an account? ' : 'New user? '}
            <a 
              href="#" 
              onClick={toggleMode} 
              style={{ color: '#e76f51', fontWeight: '600', textDecoration: 'none' }}
            >
              {isSignUpMode ? 'Sign In' : 'Create an account'}
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}