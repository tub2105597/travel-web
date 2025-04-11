'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favourites.belongsTo(models.Destinations, {
        foreignKey: 'destid',
        as: 'destinations',
      });
      Favourites.belongsTo(models.Users, {
        foreignKey: 'userid',
        as: 'users',
      });
    }
  }
  Favourites.init({
    destid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    start: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Favourites',
  });
  return Favourites;
};