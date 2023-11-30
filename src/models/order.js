"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      buyerId: DataTypes.INTEGER,
      // OrderId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      statusName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  Order.associate = function (models) {
    models.Order.belongsTo(models.User, { foreignKey: "buyerId" });
    models.Order.belongsTo(models.Product, {
      foreignKey: "productId",
    });
  };
  return Order;
};
