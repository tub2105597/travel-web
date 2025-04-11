'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Destinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      distid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Districts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      location: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      advantage: {
        type: Sequelize.TEXT
      },
      weakness: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.STRING
      },
      iframecode: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Destinations');
  }
};
