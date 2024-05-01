"use strict";
const {Model} = require("sequelize");
const {hashPassword} = require("../helper/bcrypt.js");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: "AuthorId"});
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserName cannot be empty!",
          },
          notEmpty: {
            msg: "UserName cannot be empty!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email is Already!",
        },
        validate: {
          isEmail: {
            msg: "Invalid format Email!",
          },
          notNull: {
            msg: "Email cannot be empty!",
          },
          notEmpty: {
            msg: "Email cannot be empty!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be empty!",
          },
          notEmpty: {
            msg: "Password cannot be empty!",
          },
        },
      },
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
