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
      TransactionTopping.belongsTo(models.Topping, {
        as: "toppings",
        foreignKey: {
          name: "toppingId",
        },
      });
      TransactionTopping.belongsTo(models.TransactionProduct, {
        as: "Transactionproduct",
      });
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
      tableName: "TransactionToppings",
    }
  );
  return TransactionTopping;
};
