import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { fetchCollection, getApiError } from './api.js';
import './App.css';

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Members', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
];

function Overview() {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([fetchCollection('users'), fetchCollection('activities')])
      .then(([loadedUsers, loadedActivities]) => {
        setUsers(loadedUsers);
        setActivities(loadedActivities);
      })
      .catch((reason) => setError(getApiError(reason)));
  }, []);

  const points = activities.reduce((total, activity) => total + (activity.points || 0), 0);
  const minutes = activities.reduce((total, activity) => total + (activity.durationMinutes || 0), 0);

  return (
    <section className="page-section overview-page">
      <div className="hero-panel">
        <div><p className="eyebrow">Tuesday, September 8</p><h1>Make today<br /><em>count.</em></h1><p className="hero-copy">Track the small wins that turn into a stronger you.</p></div>
        <div className="hero-spark" aria-hidden="true"><span>08</span><small>WEEK<br />STREAK</small></div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="metric-grid">
        <div className="metric-card"><span className="metric-label">Community</span><strong>{users.length}</strong><span>members moving</span></div>
        <div className="metric-card metric-card-accent"><span className="metric-label">Momentum</span><strong>{points}</strong><span>points earned</span></div>
        <div className="metric-card"><span className="metric-label">Time invested</span><strong>{minutes}</strong><span>active minutes</span></div>
      </div>
      <div className="overview-lower"><div><p className="eyebrow">Keep going</p><h2>Every session matters.</h2><p className="muted">Log an activity, check your team, and keep your momentum visible.</p></div><NavLink className="primary-button" to="/activities">View activities <span>-&gt;</span></NavLink></div>
    </section>
  );
}

function App() {
  const location = useLocation();
  const currentPage = navigation.find((item) => item.path === location.pathname)?.label || 'OctoFit';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>octofit<span className="brand-dot">.</span></span></NavLink>
        <div className="sidebar-label">Workspace</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink key={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={item.path}>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-footer"><span className="pulse-dot" /> API connected</div>
      </aside>
      <main className="content-area">
        <header className="topbar"><div><span className="breadcrumb">OctoFit / </span><strong>{currentPage}</strong></div><div className="profile-chip"><span className="avatar">P</span><span>Paul Octo</span></div></header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;