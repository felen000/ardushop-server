import CartService from '../services/CartService.js';

class CartController {
  async add(req, res, next) {
    try {
      let { productId, userId } = req.body;
      let message = await CartService.add(userId, productId);
      res.json({message});
    } catch (e) {
      next(e)
    }
  }

  async remove(req, res, next) {
    try {
      let { productId, userId } = req.body;
      let cart = await CartService.remove(userId, productId);
      res.send(cart);
    } catch (e) {
      next(e)
    }
  }

  async getProducts(req, res, next) {
    try {
      let products = await CartService.getProducts(req.params.id);
      res.send(products);
    } catch (e) {
      next(e)
    }
  }

	async setProductCount(req, res, next) {
		try {
			let { productId, userId, productCount } = req.body
			let products = await CartService.setProductCount(userId, productId, productCount)
			res.send(products)
		} catch (e) {
			next(e)
		}
	}
}

export default new CartController();
