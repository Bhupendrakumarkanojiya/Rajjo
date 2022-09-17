//const { isObject } = require('lodash');
const util = require('util');
const db = require('../config/db');

module.exports = {
  upsert: (name) => {
      const insert = db('menus')
        .insert({
          name: name
        })
      const query = util.format(
        insert.toString(),
      );
      return db.raw(query);
    
  },

  deleteMetadata: (id) => {
    const deleteUser = db('menus')
      .del()
      .where({ 'menus.id': id })
      .toString();

    const query = util.format(deleteUser.toString());
    db.raw(query) 
      .then((result) => {
        console.log(result);
      });
  }
};

