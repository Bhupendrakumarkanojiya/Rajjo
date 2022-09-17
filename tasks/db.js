/* eslint-disable no-console, no-process-exit */

require('../app/config');

const config = require('../knexfile');
const env = process.env.NODE_ENV || 'development';

const dbManager = require('knex-db-manager').databaseManagerFactory({
  knex: config[env],
  dbManager: config.dbManager,
});

const [cmd] = process.argv.slice(2);

let result;

switch (cmd) {
  case 'create':
    result = dbManager.createDb();
    break;
  case 'drop':
    result = dbManager.dropDb();
    break;
  case 'truncate':
    result = dbManager.truncateDb();
    break;
  default:
    console.log('You need to add a command (like create/drop etc)');
    console.log('\nConfiguration is derived from NODE_ENV (or development by default)');
    console.log('and reads from your `knexfile.js`');
    console.log('\nCommands: ');
    console.log('  create: create a database using NODE_ENV (or development)');
    console.log('  drop: drop the database using NODE_ENV (or development)');
}

if (result) {
  result
    .then(() => {
      console.log(`${cmd} of ${env} db succeeded`);
      process.exit(0);
    })
    .catch(err => {
      console.error(`${cmd} of ${env} db failed`);
      throw err;
    });
} else {
  process.exit(0);
}
