'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const images = [
      {
        link: 'http://localhost:8080/uploads/1728898739384.jpg',
        destid: 1,
        postid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898651763.jpg',
        destid: 7,
        postid: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898556832.jpg',
        destid: 8,
        postid: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898583552.jpg',
        destid: 12,
        postid: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898626619.jpg',
        destid: 12,
        postid: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898651763.jpg',
        destid: 7,
        postid: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898673303.jpg',
        destid: 2,
        postid: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898691465.jpg',
        destid: 9,
        postid: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898717297.jpg',
        destid: 8,
        postid: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898760309.jpg',
        destid: 4,
        postid: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728898779016.jpg',
        destid: 3,
        postid: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'http://localhost:8080/uploads/1728909441585.jpg',
        destid: 13,
        postid: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Images', images);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};
