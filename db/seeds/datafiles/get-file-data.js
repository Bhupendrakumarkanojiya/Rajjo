const fileReader = require('../../../app/services/get-file-data');

const getFileData = filename => {
  const fixtureFile = `${__dirname}/${filename}`;
  return fileReader(fixtureFile);
};

module.exports = getFileData;
