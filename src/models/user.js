"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      typeRole: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.BLOB,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.associate = function (models) {
    models.User.hasMany(models.Product, {
      foreignKey: "IdAuthor",
    });
    models.User.hasMany(models.Message, {
      as: "sender",
      foreignKey: "senderId",
    });
    models.User.hasMany(models.Message, {
      as: "receiver",
      foreignKey: "receiverId",
    });
    models.User.hasMany(models.Conversation, {
      as: "master",
      foreignKey: "idMaster",
    });
    models.User.hasMany(models.Conversation, {
      as: "member",
      foreignKey: "idMember",
    });
    models.User.hasMany(models.Order, {
      foreignKey: "buyerId",
    });
    models.User.hasMany(models.Cart, {
      foreignKey: "ownCartId",
    });
  };
  return User;
};
// Product.associate = function (models) {
//   models.Product.belongsTo(models.User, { foreignKey: "IdAuthor" });
// };
