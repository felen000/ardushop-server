import User from "../models/User.js";
import ApiError from "../exceptions/apiError.js";

class WishListService {
  async add(userId, productId) {
    let user = await User.findById(userId);

    if (!user) {
      throw ApiError.ServerError();
    }

    if (user.wishList.includes(productId)) {
      return "Already added";
    }

    user.wishList.push(productId);
    await user.save();
    return "ok";
  }

  async remove(userId, productId) {
    let user = await User.findById(userId);

    if (!user) {
      throw ApiError.ServerError();
    }
    user.wishList = user.wishList.filter((item) => item != productId);
    await user.save();
    return "ok";
  }

  async getList(userId) {
    let user = await User.findById(userId).populate("wishList");

    if (!user) {
      throw ApiError.ServerError();
    }

    return user.wishList;
  }

  async isInList(userId, productId) {
    let user = await User.findById(userId);

    if (!user) {
      throw ApiError.ServerError();
    }

    return user.wishList.includes(productId);
  }
}

export default new WishListService();
