"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      "bounties",
      "status",
      Sequelize.DataTypes.INTEGER
    );
    await queryInterface.addColumn(
      "bounties",
      "address",
      Sequelize.DataTypes.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("bounties", "status");
    await queryInterface.removeColumn("bounties", "address");
  },
};
