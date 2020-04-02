import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { Context } from '../../provider';

const Header = () => {
  const {
    store: {
      context: { isLoggedIn }
    },
    actions
  } = useContext(Context);

  return (
    <header>
      <nav>
        <ul className="navbar">
          <li className="navbar__item">
            <Link to="/">Landing</Link>
          </li>
          {isLoggedIn ? (
            <React.Fragment>
              <li className="navbar__item">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="navbar__item navbar__item--right">
                <button onClick={actions.onLogout}>Logout</button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="navbar__item navbar__item--right">
                <Link to="/register">Register</Link>
              </li>
              <li className="navbar__item">
                <Link to="/login">Login</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
