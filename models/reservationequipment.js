'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReservationEquipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReservationEquipment.belongsTo(models.Equipment, {
        foreignKey: "equipmentId"
      })
      ReservationEquipment.belongsTo(models.Reservation, {
        foreignKey: "reservationId"
      })
    }
  }
  ReservationEquipment.init({
    reservationId: DataTypes.INTEGER,
    equipmentId: DataTypes.INTEGER,
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReservationEquipment',
  });
  return ReservationEquipment;
};