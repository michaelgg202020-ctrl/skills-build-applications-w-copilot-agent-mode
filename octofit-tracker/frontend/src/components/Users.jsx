import { useEffect, useState } from 'react';
import { fetchCollection, getApiError } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((reason) => setError(getApiError(reason)));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Your community</p><h1>Members</h1><p className="muted">Meet the people making movement a habit.</p></div><span className="stat-pill">{users.length} members</span></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="member-grid">
        {users.map((user) => (
          <article className="member-card" key={user._id || user.email}>
            <span className="avatar avatar-large">{(user.name || 'U').slice(0, 1).toUpperCase()}</span>
            <div><h2>{user.name || 'Unnamed member'}</h2><p>{user.email || 'No email listed'}</p></div>
            <span className="member-status">Active</span>
          </article>
        ))}
        {!users.length && !error && <p className="empty-state">No members found.</p>}
      </div>
    </section>
  );
}

export default Users;