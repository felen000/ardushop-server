import SellerProductService from "../services/SellerProductService.js";

class SellerProductController {
  async getAll(req, res, next) {
    try {
			let { sellerId } = req.params
      let products = await SellerProductService.getAll(sellerId);
		  res.send(products);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
			let image;
			if(req.files) {
				image = req.files.image
			}
			let { productData } = req.body
			productData = JSON.parse(productData)
      let newProduct = await SellerProductService.create(image, productData);
      res.send(newProduct);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
			let { id } = req.params
			let image;
			if(req.files) {
				image = req.files.image
			}
			let { productData } = req.body
			productData = JSON.parse(productData)
      let message = await SellerProductService.update(id, image, productData);
      res.json({ message });
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      let message = await SellerProductService.delete(req.params.id);
      res.json({message});
    } catch (e) {
      next(e);
    }
  }
}

export default new SellerProductController();
