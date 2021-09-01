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
      TransactionProduct.belongsToMany(models.Topping, {
        through: "TransactionTopping",
      });
      // define association here
    }
  }
  TransactionProduct.init(
    {
      transactionId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionProduct",
      tableName: "transactionproducts",
    }
  );
  return TransactionProduct;
};
