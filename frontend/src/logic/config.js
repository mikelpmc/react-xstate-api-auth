class Config {
  constructor() {
    this._config = {
      API_URL: process.env.REACT_APP_API_BASE_URL
    };
  }

  get(key) {
    return this._config[key];
  }
}

export default Config;
