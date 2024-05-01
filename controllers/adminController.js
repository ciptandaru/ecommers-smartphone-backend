const {comparePassword} = require("../helper/bcrypt");
const {generateToken} = require("../helper/jwt");
const {User} = require("../models/index");

class adminController {
  static async registerAdmin(req, res, next) {
    try {
      const {userName, email, password} = req.body;
      const created = await User.create({
        userName,
        email,
        password,
        admin: true,
      });
      res.status(201).json({
        email: created.email,
        message: "created",
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginAdmin(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({
        where: {email},
      });
      if (!user) {
        throw {name: "loginInvalid"};
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw {name: "loginInvalid"};
      }
      const accessToken = generateToken({
        id: user.id,
        email: user.email,
        admin: user.admin,
      });
      res.status(200).json({
        statusCode: 200,
        accessToken,
        id: user.id,
        username: User.username,
        message: "Logged in",
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = adminController;
