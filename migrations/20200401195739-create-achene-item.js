module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AcheneItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      description: {
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
  cropId: {
    type: Sequelize.STRING,
    onDelete: 'CASCADE',
    references: {
      model: 'Achene',
      key: 'id', 
      as: 'cropId',
    },
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AcheneItems');
  } 
};