import Http from './http';

const { VUE_APP_URL_API } = process.env;
const http = new Http({
  baseURL: VUE_APP_URL_API,
  timeout: 5000,
});

export { http }
