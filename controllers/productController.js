const {Op} = require("sequelize");
const {Product, Category, User} = require("../models/index");

class productController {
  static async createProduct(req, res, next) {
    try {
      const {userId} = req.additionalData;
      const {name, description, price, image, CategoryId} = req.body;
      const product = await Product.create({
        name,
        description,
        price,
        image,
        AuthorId: userId,
        CategoryId,
      });
      res.status(201).json({
        statuscode: 201,
        message: product,
      });
    } catch (err) {
      next(err);
    }
  }
  static async readProduct(req, res, next) {
    const {page, pageLimit, search} = req.query;
    try {
      let option = {};

      if (page && pageLimit) {
        const parsedPage = parseInt(page);
        const parsedPageLimit = parseInt(pageLimit);

        option = {
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          limit: parsedPageLimit,
          offset: (parsedPage - 1) * parsedPageLimit,
        };
      } else if (!search && !page && !pageLimit) {
        (option.include = [
          {
            model: User,
            attributes: ["userName"],
          },
          {
            model: Category,
            attributes: ["name"],
          },
        ]),
          (option.limit = 8);
      } else if (search) {
        option.include = [
          {
            model: User,
            attributes: ["userName"],
          },
          {
            model: Category,
            attributes: ["name"],
            where: {
              name: {[Op.iLike]: `%${search}%`},
            },
          },
        ];
      }

      const result = await Product.findAndCountAll(option);

      if (result.length === 0) {
        throw {name: "NOT_FOUND"};
      }

      const totalDb = result.count;
      const perItem = 8;
      const totalPage = Math.ceil(totalDb / perItem);
      res.status(200).json({
        statusCode: 200,
        message: result,
        totalPage,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async readProductDetail(req, res, next) {
    try {
      const {id} = req.params;
      const result = await Product.findByPk(id);
      if (result === null) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json({
        statuscode: 200,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const {id} = req.params;
      const {name, description, price, image} = req.body;
      const categoryId = +req.body.categoryId;
      const result = await Product.update(
        {name, description, price, image, categoryId},
        {
          where: {
            id: +id,
          },
          returning: true,
        }
      );

      res.status(201).json({
        statuscode: 201,
        message: result[1][0],
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const {id} = req.params;
      const result = await Product.findByPk(id);
      const productDestroyed = await Product.destroy({
        where: {
          id: id,
        },
      });
      if (!productDestroyed) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json({
        statusconde: 200,
        message: `${result.name} success to delete`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({
        statuscode: 200,
        message: categories,
      });
    } catch (err) {
      next(err);
    }
  }
  static async createCategory(req, res, next) {
    try {
      const {name} = req.body;
      const result = await Category.create({
        name,
      });
      res.status(201).json({
        statuscode: 201,
        message: result,
      });
    } catch (err) {
      next(err);
    }
  }
  static async editCategory(req, res, next) {
    try {
      const {id} = req.params;
      const {name} = req.body;
      const result = await Category.update(
        {name},
        {
          where: {
            id: +id,
          },
          returning: true,
        }
      );

      res.status(201).json({
        statuscode: 201,
        message: result[1][0],
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = productController;
