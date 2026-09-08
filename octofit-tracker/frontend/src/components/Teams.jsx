import { useEffect, useState } from 'react';
import { fetchCollection, getApiError } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch((reason) => setError(getApiError(reason)));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Find your crew</p><h1>Teams</h1><p className="muted">Small groups make big goals feel closer.</p></div><span className="stat-pill">{teams.length} teams</span></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card-grid">
        {teams.map((team) => (
          <article className="feature-card" key={team._id || team.name}>
            <div className="card-mark">{(team.name || 'T').slice(0, 1).toUpperCase()}</div>
            <h2>{team.name || 'Unnamed team'}</h2>
            <p className="muted">{team.description || 'Ready to move together.'}</p>
            <div className="card-footer"><span>{team.memberIds?.length || team.members?.length || 0} members</span><span className="arrow">-&gt;</span></div>
          </article>
        ))}
        {!teams.length && !error && <p className="empty-state">No teams created yet.</p>}
      </div>
    </section>
  );
}

export default Teams;