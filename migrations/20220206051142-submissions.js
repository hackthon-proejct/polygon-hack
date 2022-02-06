"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("submissions", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      metadata: Sequelize.DataTypes.JSON,
      status: Sequelize.DataTypes.INTEGER,
      milestone: Sequelize.DataTypes.INTEGER,
      bounty_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "bounties",
          },
          key: "id",
        },
        allowNull: false,
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("submissions");
  },
};
