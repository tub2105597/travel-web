'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Destinations extends Model {

    static associate(models) {
      Destinations.hasMany(models.Images, {
        foreignKey: 'destid',
        as: 'images',
      });

      Destinations.hasMany(models.Posts, {
        foreignKey: 'destid',
        as: 'posts',
      });
      Destinations.belongsTo(models.Districts, {
        foreignKey: 'distid',
        as: 'districts',
      });
      Destinations.hasMany(models.Favourites, {
        foreignKey: 'destid',
        as: 'favourites',
      });
    }
  }

  Destinations.init({
    name: DataTypes.STRING,
    distid: DataTypes.INTEGER,
    location: DataTypes.STRING,
    time: DataTypes.STRING,
    price: DataTypes.STRING,
    advantage: DataTypes.TEXT,
    weakness: DataTypes.TEXT,
    description: DataTypes.TEXT,
    type: DataTypes.STRING,
    iframecode: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Destinations',
  });

  return Destinations;
};
