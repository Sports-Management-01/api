"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const adminRole = await queryInterface.bulkInsert("roles", [
      {
        name: "Admin",
        createdAt: Sequelize.fn("now"),
        updatedAt: Sequelize.fn("now"),
      },
      {
        name: "Company",
        createdAt: Sequelize.fn("now"),
        updatedAt: Sequelize.fn("now"),
      },
      {
        name: "Customer",
        createdAt: Sequelize.fn("now"),
        updatedAt: Sequelize.fn("now"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await models.Role.
    await queryInterface.bulkDelete(
      "roles",
      null,
      {}
    );
  },
};
