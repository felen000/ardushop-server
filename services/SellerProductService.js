import Product from "../models/Product.js";
import path from 'node:path'

class SellerProductService {
  async getAll(sellerId) {
    let products = await Product.find({seller: sellerId});
		return products;
  }

  async create(image, newProduct) {
    image.name = newProduct.title.toLowerCase().replaceAll(' ', '-') + image.name.slice(image.name.lastIndexOf("."));
    let filePath = path.join(process.cwd(), "public", "images", "goods", image.name);
    image.mv(filePath);
    newProduct.image = path.join("images", "goods", image.name);

    let product = await Product.create(newProduct);

    return product;
  }

  async update(id, image, updatedData) {
		if (image) {
			image.name = updatedData.title.toLowerCase().replaceAll(' ', '-') + image.name.slice(image.name.lastIndexOf("."));
			let filePath = path.join(process.cwd(), "public", "images", "goods", image.name);
			image.mv(filePath);
			updatedData.image = path.join("images", "goods", image.name);
		}

    await Product.findByIdAndUpdate(id, updatedData)

    return "Товар обновлён";
  }

  async delete(id) {
    let deletedProduct = await Product.findByIdAndDelete(id);
    return "Товар удалён";
  }

}

export default new SellerProductService();
