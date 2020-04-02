module.exports = (sequelize, DataTypes) => {
  const Achene = sequelize.define('Achene', {
    title: {
      type: DataTypes.STRING, 
      allowNull: false,
  }, 
});
  Achene.associate = (models) => {
    // associations can be defined here
    Achene.hasMany(models.AcheneItem, {
      foreignKey: 'cropId',
    });
  };
  return Achene;
};