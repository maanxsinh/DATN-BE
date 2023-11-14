'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      sort: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB
      },
      price: {
        type: Sequelize.FLOAT
      },
      warehouse: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      IdAuthor: {
        type: Sequelize.INTEGER
      },
      datePost: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Products');
  }
};