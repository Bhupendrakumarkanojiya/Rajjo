
const tableName = 'category';
exports.up = (knex, _Promise) => {
    return knex.schema.createTable(tableName, table => {
      table.increments('id');
      table.bigInteger('menu_id');
      table.string('category_name');
      table
      .timestamp('created_date')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    table
      .timestamp('updated_date')
      .notNullable()
      .defaultTo(knex.raw('now()'));
      
    });
  };
  
  exports.down = (knex, _Promise) => {
    return knex.schema.dropTable(tableName);
  };
  