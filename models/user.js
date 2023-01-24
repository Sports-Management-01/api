'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId'
      })
      User.hasMany(models.Field, {
        foreignKey: "companyId"
      })
      User.hasMany(models.Reservation, {
        foreignKey: "userId"
      })
    }

    async can(permission) {
      const role = await this.getRole()
      // console.log('Role', role)
      const permissionRow = await role.getPermissions({
        where: {
          permission
        }
      })
      // console.log('PERMISSION', permissionRow)
      return permissionRow[0].allowed
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    approvedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true
  });
  return User;
}; 