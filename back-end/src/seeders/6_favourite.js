'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const favourite = [
      { destid: 3, userid: 2, start: '2024-11-12', createdAt: new Date(), updatedAt: new Date() },
      { destid: 7, userid: 3, start: '2024-11-15', createdAt: new Date(), updatedAt: new Date() },
      { destid: 12, userid: 4, start: '2024-11-18', createdAt: new Date(), updatedAt: new Date() },
      { destid: 4, userid: 2, start: '2024-11-20', createdAt: new Date(), updatedAt: new Date() },
      { destid: 8, userid: 3, start: '2024-11-22', createdAt: new Date(), updatedAt: new Date() },
      { destid: 1, userid: 4, start: '2024-11-24', createdAt: new Date(), updatedAt: new Date() },
      { destid: 10, userid: 2, start: '2024-11-26', createdAt: new Date(), updatedAt: new Date() },
      { destid: 5, userid: 3, start: '2024-11-28', createdAt: new Date(), updatedAt: new Date() },
      { destid: 9, userid: 4, start: '2024-12-01', createdAt: new Date(), updatedAt: new Date() },
      { destid: 2, userid: 2, start: '2024-12-03', createdAt: new Date(), updatedAt: new Date() },
      { destid: 11, userid: 3, start: '2024-12-05', createdAt: new Date(), updatedAt: new Date() },
      { destid: 6, userid: 4, start: '2024-12-07', createdAt: new Date(), updatedAt: new Date() },
      { destid: 13, userid: 2, start: '2024-12-09', createdAt: new Date(), updatedAt: new Date() },
      { destid: 14, userid: 3, start: '2024-12-11', createdAt: new Date(), updatedAt: new Date() },
      { destid: 1, userid: 4, start: '2024-12-13', createdAt: new Date(), updatedAt: new Date() }
    ]
    await queryInterface.bulkInsert('Favourites', favourite, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favourites', null, {});
  }
};
