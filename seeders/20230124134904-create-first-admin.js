'use strict';

const { hashPassword } = require('../services/passwordService');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users', [
    {
      name: 'Meis',
      email: 'meiss@gmail.com',
      password: hashPassword('Feras143'),
      phone: '+905555712345',
      roleId: '1',
      createdAt: Sequelize.fn("now"),
      updatedAt: Sequelize.fn("now"),
     }
   ])
  },

  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', {
      email: 'meis@gmail.com'
    })
  }
};
