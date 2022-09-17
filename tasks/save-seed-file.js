/*eslint no-console: "off"*/
const path = require('path');
const fs = require('fs');

const saveSeedFile = (filename, data) => {
  const seedFilePath = path.join(__dirname, '..', 'db', 'seeds', 'datafiles', filename);
  const contents = JSON.stringify(data);
  fs.writeFileSync(seedFilePath, contents);
  return data;
};

module.exports = saveSeedFile;
