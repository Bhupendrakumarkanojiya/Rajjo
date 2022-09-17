/*eslint no-console: "off"*/
const logger = require('../app/logger');

module.exports = async (knex, tableName, data) => {
  const batchSize = 500;
  let result;

  try {
    result = await knex.transaction(trx => {
      return knex(tableName)
        .del()
        .then(() => {
          logger.info(`Batch inserting records into ${tableName}`);
          return knex.batchInsert(tableName, data, batchSize).transacting(trx);
        });
    });
  } catch (err) {
    console.error('Failed to delete rows from', tableName, err);
    throw err;
  }

  return result;
};
