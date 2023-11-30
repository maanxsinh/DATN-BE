"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init(
    {
      authorName: DataTypes.STRING,
      ownCartId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      statusName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  Cart.associate = function (models) {
    models.Cart.belongsTo(models.User, { foreignKey: "ownCartId" });
    models.Cart.belongsTo(models.Product, {
      foreignKey: "productId",
    });
  };
  return Cart;
};
