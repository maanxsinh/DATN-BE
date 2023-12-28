"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      conversationId: DataTypes.INTEGER,
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      timeSend: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  Message.associate = function (models) {
    models.Message.belongsTo(models.User, {
      as: "sender",
      foreignKey: "senderId",
    });
    models.Message.belongsTo(models.User, {
      as: "receiver",
      foreignKey: "receiverId",
    });
    models.Message.belongsTo(models.Conversation, {
      foreignKey: "conversationId",
    });
  };
  return Message;
};
