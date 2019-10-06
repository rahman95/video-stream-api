const config = require('./../../config.json');
const routerPrefix = config.router.prefix;

const buildBaseUrl = type => {
  let baseUrl = routerPrefix;

  if (type) {
    baseUrl = `${baseUrl}/${type}`;
  }

  return baseUrl;
};

const buildUserUrl = (params = {}) => {
  let url = buildBaseUrl('user');

  if (params.user) {
    url = `${url}/${params.user}`;
  }

  return url;
};

const buildStreamUrl = (params = {}) => {
  let url = buildBaseUrl('stream');

  if (params.stream) {
    url = `${url}/${params.stream}`;
  }

  url = `${url}/user`;

  if (params.user) {
    url = `${url}/${params.user}`;
  }

  return url;
};

module.exports = {
  buildBaseUrl,
  buildUserUrl,
  buildStreamUrl,
};
