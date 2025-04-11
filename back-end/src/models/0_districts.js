'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Districts extends Model {

    static associate(models) {

      Districts.hasMany(models.Destinations, {
        foreignKey: 'distid',
        as: 'destinations',
      });
    }

  }

  Districts.init({
    name: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Districts',
  });
  return Districts;
};