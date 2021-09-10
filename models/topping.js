"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Topping.hasMany(models.TransactionTopping, {
        as: "TransactionTopping",
        foreignKey: {
          name: "toppingId",
        },
      });
    }
  }
  Topping.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Topping",
      tableName: "Toppings",
    }
  );
  return Topping;
};
