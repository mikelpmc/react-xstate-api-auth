import STATES from './states';
import EVENTS from './events';

import createAuthMachine from './createAuthMachine';
import { authService } from '../service';

const authMachine = createAuthMachine({ authService });

export { authMachine, STATES, EVENTS };
