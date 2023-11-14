"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      statusId: DataTypes.STRING,
      name: DataTypes.STRING,
      sort: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.BLOB,
      price: DataTypes.FLOAT,
      warehouse: DataTypes.INTEGER,
      weight: DataTypes.STRING,
      status: DataTypes.STRING,
      IdAuthor: DataTypes.INTEGER,
      datePost: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  Product.associate = function (models) {
    models.Product.belongsTo(models.User, { foreignKey: "IdAuthor" });
    models.Product.belongsTo(models.AllCode, {
      foreignKey: "statusId",
    });
  };
  return Product;
};
