import React from 'react';
import { useMachine } from '@xstate/react';
import { authMachine, EVENTS } from '../machine';

export const Context = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, send] = useMachine(authMachine);

  const register = (name, email, password) => {
    send(EVENTS.REGISTER, { name, email, password });
  };
  const login = (email, password) => {
    send(EVENTS.LOGIN, { email, password });
  };
  const logout = () => {
    send(EVENTS.LOGOUT);
  };

  return <Context.Provider value={{ store: state, actions: { register, login, logout } }}>{children}</Context.Provider>;
};

export default AuthProvider;
