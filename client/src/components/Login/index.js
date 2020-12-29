import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../../provider';
import { STATES } from '../../machine';
import './index.css';

const Login = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    actions.onLogin(email, password);
  };

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>

      {store.matches({ [STATES.LOGIN.NODE_NAME]: STATES.LOGIN.FAILURE }) && <p>{store.context.error}</p>}
      {store.matches({ [STATES.LOGIN.NODE_NAME]: STATES.LOGIN.LOADING }) && <p>Authorizing....</p>}
      {store.matches({ [STATES.LOGIN.NODE_NAME]: STATES.LOGIN.SUCCESS }) && <Redirect to="/" />}

      <form className="login__form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={email}
            name="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <input
            type="password"
            value={password}
            name="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button className="login__button" type="submit">
          Login
        </button>

        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;
