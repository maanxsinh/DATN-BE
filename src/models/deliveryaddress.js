"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeliveryAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DeliveryAddress.init(
    {
      userId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DeliveryAddress",
    }
  );
  DeliveryAddress.associate = function (models) {
    models.DeliveryAddress.hasMany(models.Order, {
      foreignKey: "addressId",
    });
  };
  return DeliveryAddress;
};
