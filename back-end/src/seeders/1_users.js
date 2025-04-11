'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        username: 'admin',
        password: bcrypt.hashSync('admin', salt),
        role: 'admin',
        avatar: 'http://localhost:8080/uploads/1728898797819.jpg',
        fullname: 'Administrator',
        email: 'admin@gmail.com',
        gender: 'male',
        DoB: '1980-01-01',
        address: 'Cần Thơ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'cam_tu',
        password: bcrypt.hashSync('123456', salt),
        role: 'user',
        avatar: 'http://localhost:8080/uploads/1728898797819.jpg',
        fullname: 'Nguyễn Thị Cẩm Tú',
        email: 'camtu@gmail.com',
        gender: 'female',
        DoB: '1999-09-09',
        address: 'Đồng Tháp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'khanh_hoang',
        password: bcrypt.hashSync('123456', salt),
        role: 'user',
        avatar: 'http://localhost:8080/uploads/1728898797819.jpg',
        fullname: 'Lê Hoàng Khanh',
        email: 'hoangkhanh@gmail.com',
        gender: 'male',
        DoB: '1950-01-01',
        address: 'Hưng Yên',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'thao_ngoc',
        password: bcrypt.hashSync('123456', salt),
        role: 'user',
        avatar: 'http://localhost:8080/uploads/1728898797819.jpg',
        fullname: 'Phạm Ngọc Thảo',
        email: 'thaopham@gmail.com',
        gender: 'female',
        DoB: '1999-09-09',
        address: 'Cần Thơ',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
