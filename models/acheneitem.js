module.exports = (sequelize, DataTypes) => {
  const AcheneItem = sequelize.define('AcheneItem', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
  }, 
});
  AcheneItem.associate = (models) => {
    // associations can be defined here
    AcheneItem.belongsTo(models.Achene, {
      foreignKey: 'cropId',
      onDelete: 'CASCADE',
    });
  };
  return AcheneItem;
};