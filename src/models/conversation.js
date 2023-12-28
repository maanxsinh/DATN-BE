"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conversation.init(
    {
      conversationName: DataTypes.STRING,
      idMaster: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  Conversation.associate = function (models) {
    // models.User.hasMany(models.Message, {
    //   foreignKey: "conversationId",
    // });
    models.Conversation.belongsTo(models.User, {
      as: "master",
      foreignKey: "idMaster",
    });
    models.Conversation.belongsTo(models.User, {
      as: "member",
      foreignKey: "idMember",
    });
    // models.Conversation.belongsTo(models.User, { foreignKey: "idMember" });
    // models.User.hasMany(models.Message, {
    //   foreignKey: "senderId",
    // });
    // models.User.hasMany(models.Message, {
    //   foreignKey: "receiverId",
    // });
  };
  return Conversation;
};
