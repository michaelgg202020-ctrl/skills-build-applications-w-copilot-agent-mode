import { useEffect, useState } from 'react';
import { fetchCollection, getApiError } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(getApiError(reason)));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Your next move</p><h1>Workouts</h1><p className="muted">A little structure goes a long way.</p></div></div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card-grid workout-grid">
        {workouts.map((workout) => (
          <article className="feature-card workout-card" key={workout._id || workout.title}>
            <div className="workout-meta"><span>{workout.activityType || 'Training'}</span><span>{workout.level || 'All levels'}</span></div>
            <h2>{workout.title || 'Untitled workout'}</h2><p className="muted">{workout.description || 'A focused session for today.'}</p>
            <div className="card-footer"><span>{workout.durationMinutes || 0} minutes</span><button type="button" className="icon-button" aria-label={`Start ${workout.title || 'workout'}`} title="Start workout">+</button></div>
          </article>
        ))}
        {!workouts.length && !error && <p className="empty-state">No workouts available yet.</p>}
      </div>
    </section>
  );
}

export default Workouts;