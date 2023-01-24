'use strict';

const permissions = require('../utils/permissions')

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

    const notAllowed = []

   const adminPermissions = permissions.map((p) => {
    return {
      roleId: 1,
      permission: p,
      allowed: notAllowed.indexOf(p) > -1 ? 0 : 1,
      createdAt: Sequelize.fn('now'),
      updatedAt: Sequelize.fn('now'),
    }
   })
   await queryInterface.bulkInsert('permissions', adminPermissions)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
