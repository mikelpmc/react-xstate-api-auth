import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../../provider';
import { STATES } from '../../machine';
import './index.css';

const Register = () => {
  const { store, actions } = useContext(Context);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    actions.onRegister(name, email, password);
  };

  return (
    <div className="register">
      <h1 className="register__title">Register</h1>

      {store.matches({ [STATES.REGISTER.NODE_NAME]: STATES.REGISTER.FAILURE }) && <p>Error! {store.context.error}</p>}
      {store.matches({ [STATES.REGISTER.NODE_NAME]: STATES.REGISTER.LOADING }) && <p>Registering your data...</p>}
      {store.matches({ [STATES.REGISTER.NODE_NAME]: STATES.REGISTER.SUCCESS }) && <Redirect to="/login" />}

      <form className="register__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          name="name"
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <br />

        <input
          type="text"
          value={email}
          name="email"
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <br />

        <input
          type="password"
          value={password}
          name="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <br />

        <button className="register__button" type="submit">
          Register
        </button>

        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Register;
