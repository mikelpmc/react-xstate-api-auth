import { Machine, assign } from 'xstate';
import STATES from './states';
import EVENTS from './events';

// https://xstate.js.org/viz/?gist=94e9a29e1ab016e06b8b354b9d558cf2

const createAuthMachine = ({ authService }) =>
  Machine({
    id: 'authMachine',
    initial: STATES.IDLE,
    context: {
      isLoggedIn: false,
      isRegistered: false,
      user: {},
      error: ''
    },
    states: {
      [STATES.IDLE]: {
        on: {
          [EVENTS.REGISTER]: { target: STATES.REGISTER.NODE_NAME },
          [EVENTS.LOGIN]: { target: STATES.LOGIN.NODE_NAME }
        }
      },
      [STATES.REGISTER.NODE_NAME]: {
        initial: STATES.REGISTER.LOADING,
        states: {
          [STATES.REGISTER.LOADING]: {
            invoke: {
              id: 'registerService',
              src: (_, event) => authService.register(event.name, event.email, event.password),
              onDone: {
                target: STATES.REGISTER.SUCCESS,
                actions: assign({
                  isRegistered: (_, event) => {
                    return event.data;
                  }
                })
              },
              onError: {
                target: STATES.REGISTER.FAILURE,
                actions: assign({
                  isRegistered: false,
                  error: (_, event) => {
                    return event.data.message;
                  }
                })
              }
            }
          },
          [STATES.REGISTER.SUCCESS]: {},
          [STATES.REGISTER.FAILURE]: {}
        }
      },
      [STATES.LOGIN.NODE_NAME]: {
        initial: STATES.LOGIN.LOADING,
        states: {
          [STATES.LOGIN.LOADING]: {
            invoke: {
              id: 'loginService',
              src: (_, event) => authService.login(event.email, event.password),
              onDone: {
                target: STATES.LOGIN.SUCCESS,
                actions: assign({
                  isLoggedIn: (_, event) => {
                    return event.data;
                  }
                })
              },
              onError: {
                target: STATES.LOGIN.FAILURE,
                actions: assign({
                  isRegistered: false,
                  error: (_, event) => {
                    return event.data.message;
                  }
                })
              }
            }
          },
          [STATES.LOGIN.SUCCESS]: {
            invoke: {
              id: 'retrieveUserService',
              src: authService.retrieveUser,
              onDone: {
                actions: assign({
                  user: (_, event) => {
                    return event.data;
                  }
                })
              },
              onError: {
                target: STATES.LOGIN.FAILURE,
                actions: assign({
                  user: {},
                  error: (_, event) => {
                    return event.data.message;
                  }
                })
              }
            },
            on: {
              [EVENTS.LOGOUT]: {
                target: `#authMachine.${STATES.IDLE}`,
                actions: assign({
                  isLoggedIn: false,
                  isRegistered: false,
                  error: '',
                  user: {}
                })
              }
            }
          },
          [STATES.LOGIN.FAILURE]: {}
        }
      }
    }
  });

export default createAuthMachine;
