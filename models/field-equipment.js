'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field - Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Field - Equipment.init({
    equipmentId: DataTypes.INTEGER,
    fieldId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Field-Equipment',
  });
  return Field - Equipment;
};