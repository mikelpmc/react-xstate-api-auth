import { Machine, assign } from 'xstate';

const STATES = {
  IDLE: 'idle',
  REGISTER: {
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'failure'
  },
  LOGIN: {
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'failure'
  }
};

const EVENTS = {
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout'
};

const createAuthMachine = ({ authService }) =>
  Machine({
    id: 'authMachine',
    initial: 'idle',
    context: {
      isLoggedIn: null,
      isRegistered: false,
      user: {},
      name: '',
      email: '',
      password: '',
      error: ''
    },
    states: {
      idle: {
        on: {
          register: { target: 'register' }
        }
      },
      register: {
        initial: 'loading',
        states: {
          loading: {
            invoke: {
              id: 'registerService',
              src: (_, event) => authService.register(event.name, event.email, event.password),
              onDone: {
                target: 'success',
                actions: assign({
                  isRegistered: (_, event) => {
                    return event.data;
                  }
                })
              }
            }
          },
          success: {}
        }
      }
    }
  });

export default createAuthMachine;
