'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Field.belongsTo(models.User, {
        foreignKey: 'companyId'
      })
      Field.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      })
      Field.hasMany(models.Reservation, {
        foreignKey: "fieldId"
      })
      
    }
  }
  Field.init({
    name: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    hourPrice: DataTypes.INTEGER,
    from: DataTypes.STRING, // 09:00
    to: DataTypes.STRING,
    stateId: DataTypes.INTEGER,
    adress: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    isActive: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Field',
    paranoid: true
  });
  return Field;
};