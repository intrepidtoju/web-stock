const devConfig = {
  BASE_URL: 'http://localhost:3100/api/v1',
  // BASE_URL: 'https://ipman-api.herokuapp.com/api/v1',
  ENV: 'dev',
};

const prodConfig = {
  BASE_URL: 'https://ipman-api.herokuapp.com/api/v1',
  ENV: 'prod',
};

const defaultConfig = {
  APP_NAME: 'Stock',
};

const envConfig = (env) => {
  if (env === 'dev') {
    return {
      ...defaultConfig,
      ...devConfig,
    };
  } else {
    return {
      ...defaultConfig,
      ...prodConfig,
    };
  }
};

export default envConfig('dev');
