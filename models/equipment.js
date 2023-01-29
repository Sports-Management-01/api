'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Equipment.belongsToMany(models.Category, {
        through: "CategoryEquipments",
        foreignKey: "equipmentId",
        as: "category"
      })
      Equipment.belongsToMany(models.Reservation, {
        through: "ReservationEquipments",
        foreignKey: "equipmentId",
        as: "equipment"
      })
    }
  }
  Equipment.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    multiple: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Equipment',
    paranoid: true,
    tableName:"Equipments"
    
  });
  return Equipment;
};