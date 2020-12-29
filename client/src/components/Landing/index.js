import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../provider';
import './index.css';

const Landing = () => {
  const { store } = useContext(Context);

  return (
    <div className="landing">
      <h1 className="landing__title">React Xstate auth demo</h1>

      {!store.context.isLoggedIn ? (
        <React.Fragment>
          <Link to="/login" className="landing__button">
            Login
          </Link>

          <Link to="/register" className="landing__button">
            Register
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>Welcome back!</p>
          <Link to="/dashboard" className="landing__button">
            Go to Dashboard
          </Link>
        </React.Fragment>
      )}
    </div>
  );
};

export default Landing;
