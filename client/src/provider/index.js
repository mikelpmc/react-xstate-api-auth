import React, { useCallback } from 'react';
import { useMachine } from '@xstate/react';
import { authMachine, EVENTS } from '../machine';

export const Context = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, send] = useMachine(authMachine);

  const handleRegister = useCallback(
    (name, email, password) => {
      send(EVENTS.REGISTER, { name, email, password });
    },
    [send]
  );

  const handleLogin = useCallback(
    (email, password) => {
      send(EVENTS.LOGIN, { email, password });
    },
    [send]
  );

  const handleLogout = useCallback(() => {
    send(EVENTS.LOGOUT);
  }, [send]);

  const handleRetrieveUser = useCallback(() => {
    send(EVENTS.RETRIEVE_USER);
  }, [send]);

  return (
    <Context.Provider
      value={{
        store: state,
        actions: {
          onRegister: handleRegister,
          onLogin: handleLogin,
          onLogout: handleLogout,
          onRetrieveUser: handleRetrieveUser
        }
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
