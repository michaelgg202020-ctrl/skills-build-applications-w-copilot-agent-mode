import { useEffect, useState } from 'react';
import { fetchCollection, getApiError } from '../api.js';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard').then(setLeaders).catch((reason) => setError(getApiError(reason)));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="muted">Celebrate consistency, one point at a time.</p></div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="leaderboard-list">
        {leaders.map((leader, index) => (
          <div className={`leader-row ${index === 0 ? 'leader-row-top' : ''}`} key={leader.userId || leader._id || index}>
            <span className="rank">{String(index + 1).padStart(2, '0')}</span>
            <span className="avatar">{(leader.name || 'U').slice(0, 1).toUpperCase()}</span>
            <div className="leader-info"><strong>{leader.name || 'Unknown member'}</strong><small>{leader.activities || 0} activities</small></div>
            <strong className="leader-points">{leader.points || 0}<small> pts</small></strong>
          </div>
        ))}
        {!leaders.length && !error && <p className="empty-state">The leaderboard is waiting for its first workout.</p>}
      </div>
    </section>
  );
}

export default Leaderboard;