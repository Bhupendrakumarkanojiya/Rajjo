//const { isObject } = require('lodash');
const util = require('util');
const db = require('../config/db');

module.exports = {
  upsert: ({menu_id, alias_name, ingrediants}) => {
      const insert = db('metadata')
        .insert({
            menu_id,
            alias_name,
            ingrediants
        })
      const query = util.format(
        insert.toString(),
      );
      return db.raw(query);
    
  },

  deleteMenu: (id) => {
    const deleteUser = db('menu')
      .del()
      .where({ 'menu.id': id })
      .toString();

    const query = util.format(deleteUser.toString());
    db.raw(query) 
      .then((result) => {
        console.log(result);
      });
  }
};

