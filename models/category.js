'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsToMany(models.Equipment, {
        through: "CategoryEquipments",
        foreignKey: "categoryId",
        as: "equipments"
      })
      Category.hasMany(models.Field, {
        foreignKey: "categoryId"
      })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    paranoid: true
  });
  return Category;
};