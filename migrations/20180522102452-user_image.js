'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'photo',
    {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    } 
  )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'photo')
  }
};
