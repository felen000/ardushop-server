import ProductService from "../services/ProductService.js";

class ProductController {
  async getAll(req, res, next) {
    try {
      let products = await ProductService.getAll();
      res.send(products);
    } catch (e) {
      next(e);
    }
  }

  async getBestsellers(req, res, next) {
    try {
      let products = await ProductService.getBestsellers();
      res.send(products);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      let product = await ProductService.getOne(req.params.id);
      res.send(product);
    } catch (e) {
      next(e);
    }
  }

  async isInCart(req, res, next) {
    try {
			let { productId, userId } = req.query
      let isInCart = await ProductService.isInCart(req.query);
      res.json({isInCart});
    } catch (e) {
      next(e);
    }
  }
}

export default new ProductController();
