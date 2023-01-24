'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fields', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      companyId: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      categoryId: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      length: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      width: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      hourPrice: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      from: {
        type: Sequelize.STRING(5)
      },
      to: {
        type: Sequelize.STRING(5)
      },
      city: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      state: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      adress: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8)
      },
      longitude: {
        type: Sequelize.DECIMAL(11,8)
      },
      isActive: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Fields');
  }
};