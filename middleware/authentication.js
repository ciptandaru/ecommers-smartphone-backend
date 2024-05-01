const {verifyToken} = require("../helper/jwt");
const {User, Product} = require("../models");

async function authentication(req, res, next) {
  try {
    const {access_token} = req.headers;
    if (!access_token) {
      throw {name: "Unauthenticated"};
    }
    const payload = verifyToken(access_token);
    let user = await User.findOne({where: {id: payload.id}});
    if (!user) {
      throw {name: "Unauthenticated"};
    }
    req.additionalData = {
      userId: user.id,
      userName: user.userName,
      admin: user.admin,
    };
    next();
  } catch (err) {
    next(err);
  }
}

async function authorizationAdmin(req, res, next) {
  try {
    const {admin} = req.additionalData;

    if (admin === true) {
      return next();
    } else {
      throw {name: "Unauthorized"};
    }
  } catch (err) {
    next(err);
  }
}

async function authorization(req, res, next) {
  try {
    const {id} = req.params;
    const user = await User.findOne({
      where: {id: req.additionalData.userId},
    });

    if (!user) throw {name: "Unauthorized"};
    const product = await Product.findOne({where: {id: id}});
    if (!product) throw {name: "Unauthorized"};
    if (user.admin !== true) {
      if (user.id === product.AuthorId) {
        return next();
      } else {
        throw {name: "Unauthorized"};
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  authentication,
  authorizationAdmin,
  authorization,
};
