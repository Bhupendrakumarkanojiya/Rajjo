const config = require('../../knexfile');

const env = process.env.TARGET_ENV || 'development';
const knex = require('knex');

// This is only necessary for server-related tasks. CLI-invoked tasks
// operations will automatically retrieve the correct configuration from
// the knexfile.js in the root directory.
module.exports = knex(config[env]);
