'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {

    static associate(models) {
      Posts.belongsTo(models.Users, {
        foreignKey: 'userid',
        as: 'user',
      });
      Posts.belongsTo(models.Destinations, {
        foreignKey: 'destid',
        as: 'destination',
      });
      Posts.hasMany(models.Images, {
        foreignKey: 'postid',
        as: 'images',
      });
    }
  }
  Posts.init({
    content: DataTypes.TEXT,
    rate: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    destid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};