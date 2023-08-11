import ApiError from "../exceptions/apiError.js";
import User from "../models/User.js";

class CartService {
  async add(userId, productId) {
    let user = await User.findById(userId);
		if (!user) {
			throw ApiError.ServerError()
		}
		let product = user.cart.find(item => item.productInfo == productId)
		if(product) {
			return 'Товар уже в корзине'
		}
    user.cart.push({productInfo: productId, count: 1});
		await user.save();
    return 'ok';
  }

  async remove(userId, productId) {
		console.log(userId)
    let user = await User.findById(userId);
		if (!user) {
			throw ApiError.ServerError()
		}
    user.cart.forEach((item, i) => {
      if (item.productInfo == productId) user.cart.splice(i, 1);
    });
    await user.save();

    let { cart } = await User.findById(userId);
    return cart;
  }

  async getProducts(userId) {
    let { cart: products } = await User.findById(userId).populate('cart.productInfo');
    return products;
  }

	async setProductCount(userId, productId, productCount) {
		let user = await User.findById(userId);
		if (!user) {
			throw ApiError.ServerError()
		}
		let product = user.cart.find(item => item.productInfo == productId)
		product.count = productCount
    await user.save();

    return 'ok';
  }
}

export default new CartService();
