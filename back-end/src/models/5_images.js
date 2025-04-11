'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Images extends Model {

    static associate(models) {
      Images.belongsTo(models.Posts, {
        foreignKey: 'postid',
        as: 'post'
      });
      Images.belongsTo(models.Destinations, {
        foreignKey: 'destid',
        as: 'destination'
      });
    }
  }

  Images.init({
    link: DataTypes.STRING,
    destid: DataTypes.INTEGER,
    postid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Images',
  });

  return Images;
};
