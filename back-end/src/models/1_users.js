'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

    static associate(models) {
      Users.hasMany(models.Posts, {
        foreignKey: 'userid',
        as: 'posts',
      });
      Users.hasMany(models.Favourites, {
        foreignKey: 'userid',
        as: 'favourites',
      });
    }
  }
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    avatar: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    DoB: DataTypes.DATE,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};