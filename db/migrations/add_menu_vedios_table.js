
const tableName = 'menu_vedios';
exports.up = (knex, _Promise) => {
    return knex.schema.createTable(tableName, table => {
      table.increments('id');
      table.string('vedio_url').notNullable();
      table.bigInteger('menu_id');
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
  