let fs = require('fs')

const FILE_NAME = './assets/pie.json';
let pieRepo = {
  get: function (resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  },

  getById: function (id, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pie = JSON.parse(data).find(p => p.id == id);
        resolve(pie);
      }
    });
  },

  search: function (searchObject, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pie = JSON.parse(data);

        if (searchObject) {
          pie = pie.filter(
            p => (searchObject.id ? p.id == searchObject.id : true) && (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true)
          );
        }
        resolve(pie);
      }
    });
  },

  insert: function (newData, resolve, reject) {
    fs.readFile(FILE_NAME, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let pie = JSON.parse(data);
        pie.push(newData);
        fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(newData);
          }
        });
      }
    });
  },


};

module.exports = pieRepo;