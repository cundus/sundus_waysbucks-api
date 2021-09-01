"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        as: "transaction",
        foreignKey: "userId",
      });

      Transaction.belongsToMany(models.Product, {
        through: "TransactionProduct",
      });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      zipCode: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
    }
  );
  return Transaction;
};
