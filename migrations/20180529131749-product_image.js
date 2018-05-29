'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('products', 'image', 
   {
     type: Sequelize.DataTypes.STRING,
     allowNull: true
   }
  )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('products', 'image')
  }
};
