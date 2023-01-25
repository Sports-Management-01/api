'use strict';

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
      email: 'meis@gmail.com',
      password: '12345678',
      phone: '+905555112345',
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
      email: 'shafeeq@gmail.com'
    })
  }
};
