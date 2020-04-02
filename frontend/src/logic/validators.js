class Validators {
  constructor(validateEmail) {
    this._validators = {
      validateEmail
    };
  }

  get(key) {
    return this._validators[key];
  }
}

export default Validators;
