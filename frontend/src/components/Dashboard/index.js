import React, { useContext, useEffect } from 'react';
import { Context } from '../../provider';
import './index.css';

const Dashboard = () => {
  const {
    store,
    actions: { onRetrieveUser }
  } = useContext(Context);

  useEffect(() => {
    onRetrieveUser();
  }, [store]);

  const loading = 'login.success.retrieve_user.loading';
  const failure = 'login.success.retrieve_user.failure';
  const success = 'login.success.retrieve_user.success';

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      {store.matches(failure) && <p>{store.context.error}</p>}
      {store.matches(loading) && <p>Retrieving user info...</p>}
      {store.matches(success) && (
        <div className="dashboard__info">
          <p>Name: {store.context.user.name}</p>
          <p>Email: {store.context.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
