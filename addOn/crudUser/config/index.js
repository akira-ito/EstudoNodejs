var env = require('./env.json');

module.exports = function() {
  var node_env = process.env.NODE_ENV || 'DES';
  console.log('nodeEnv', node_env, env[node_env]);
  return env[node_env];
};