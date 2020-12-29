import Config from './config';
import Validators from './validators';
import AuthService from './authService';

import { validateEmail } from '../utils/validate-email';

const authService = new AuthService({
  config: new Config(),
  validators: new Validators(validateEmail)
});

export { authService };
