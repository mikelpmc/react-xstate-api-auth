import React, { useContext } from 'react';
import './index.css';

const Dashboard = () => {
  const {} = useContext(Context);

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      {Object.keys(user).length > 0 ? (
        <div className="dashboard__info">
          <p>Name: {user.name || 'No name'}</p>
          <p>Email: {user.email || 'No email'}</p>
        </div>
      ) : (
        'Loading user info...'
      )}
    </div>
  );
};

export default Dashboard;
