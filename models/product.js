"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: "CategoryId"});
      Product.belongsTo(models.User, {foreignKey: "AuthorId"});
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      AuthorId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User cannot be empty!",
          },
          notEmpty: {
            msg: "User cannot be empty!",
          },
        },
      },
      CategoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category cannot be empty!",
          },
          notEmpty: {
            msg: "Category cannot be empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
