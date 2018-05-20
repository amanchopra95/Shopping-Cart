'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'email',
      {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        unique: true
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'email')
  }
};
