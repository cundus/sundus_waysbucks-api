"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionProduct.belongsTo(models.Transaction, {
        as: "order",
      });

      TransactionProduct.belongsTo(models.Product, {
        as: "product",
        foreignKey: {
          name: "productId",
        },
      });

      TransactionProduct.hasMany(models.TransactionTopping, {
        foreignKey: {
          name: "transactionProductId",
        },
        as: "toppings",
      });
      // define association here
    }
  }
  TransactionProduct.init(
    {
      transactionId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      subtotal: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionProduct",
      tableName: "TransactionProducts",
    }
  );
  return TransactionProduct;
};
