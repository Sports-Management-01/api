'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      reservationId: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      amount: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      paymentWay: {
        type: Sequelize.STRING
      },
      dateTime: {
        type: Sequelize.DATE
      },
      paymentInfo: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Payments');
  }
};