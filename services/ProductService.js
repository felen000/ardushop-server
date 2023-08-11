import Product from "../models/Product.js";
import User from "../models/User.js";

class ProductService {
  async getAll() {
    let products = await Product.find();
    return products;
  }

	async getBestsellers() {
		let products = await Product.find({categories: 'bestseller'});
    return products;
	}

  async getOne(id) {
    let product = await Product.findById(id);
    return product;
  }

  async isInCart({ productId, userId }) {
    let user = await User.findById(userId).populate("cart.productInfo");
    let cart = user.cart;

    return (
      cart.findIndex((product) => product.productInfo._id == productId) != -1
    );
  }
}

export default new ProductService();
