import WishListService from "../services/WishListService.js";

class WishListController {
  async add(req, res, next) {
    try {
      let { userId, productId } = req.body;
      let result = await WishListService.add(userId, productId);

      res.json({ message: result });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      let { userId, productId } = req.body;
      let result = await WishListService.remove(userId, productId);

      res.json({ message: result });
    } catch (e) {
      next(e);
    }
  }

  async getList(req, res, next) {
    try {
      let { id } = req.params;
      let list = await WishListService.getList(id);
      res.json(list);
    } catch (e) {
      next(e);
    }
  }

  async isInList(req, res, next) {
    try {
      let { userId, productId } = req.query;
			let inList = await WishListService.isInList(userId, productId)

			res.json({ inList })
    } catch (e) {
      next(e);
    }
  }
}

export default new WishListController();
