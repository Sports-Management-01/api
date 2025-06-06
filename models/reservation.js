'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Reservation.hasMany(models.ReservationEquipment, {
        foreignKey: "reservationId",
      })
      Reservation.belongsTo(models.Field, {
        foreignKey: 'fieldId'
      })
      Reservation.hasMany(models.Payment, {
        foreignKey: "reservationId"
      })
    }
  }
  Reservation.init({
    fieldId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    total: DataTypes.INTEGER,
    cancelationReason:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Reservation',
    paranoid: true
  });
  return Reservation;
};