import { useEffect, useState } from 'react';
import { fetchCollection, getApiError } from '../api.js';

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'No date';
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((reason) => setError(getApiError(reason)));
  }, []);

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Movement log</p>
          <h1>Activities</h1>
          <p className="muted">Every session adds momentum to the team.</p>
        </div>
        <span className="stat-pill">{activities.length} sessions</span>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-shell">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead><tr><th>Member</th><th>Activity</th><th>Duration</th><th>Points</th><th>Date</th></tr></thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || `${activity.type}-${activity.performedAt}`}>
                  <td><strong>{activity.userId?.name || activity.user?.name || activity.userId || 'Unknown member'}</strong></td>
                  <td><span className="activity-type">{activity.type || 'Other'}</span></td>
                  <td>{activity.durationMinutes || 0} min</td>
                  <td className="points">+{activity.points || 0}</td>
                  <td>{formatDate(activity.performedAt || activity.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!activities.length && !error && <p className="empty-state">No activities recorded yet.</p>}
      </div>
    </section>
  );
}

export default Activities;