"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionTopping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionTopping.init(
    {
      transactionProductId: DataTypes.INTEGER,
      toppingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionTopping",
      tableName: "transactiontoppings",
    }
  );
  return TransactionTopping;
};