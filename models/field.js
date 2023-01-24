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
    }
  }
  Field.init({
    companyId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    hourPrice: DataTypes.INTEGER,
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    adress: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER,
    isActive: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Field',
  });
  return Field;
};