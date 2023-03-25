const config = require('config');
const configLoader = () => {
  return config as Record<string, object>;
};
export { configLoader };
