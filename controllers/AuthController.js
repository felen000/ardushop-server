import AuthService from "../services/AuthService.js";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import ApiError from "../exceptions/apiError.js";
class AuthController {
  async registration(req, res, next) {
    try {
      let errors = validationResult(req);

      if (!errors.isEmpty()) {
        next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
        return;
      }

      let { username, email, password, isSeller } = req.body;
      let userData = await AuthService.registration(username, email, password, isSeller);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 24 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let userData = await AuthService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 24 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getUsers(req, res, next) {
    let users = await User.find();
    res.json(users);
  }

  async logout(req, res, next) {
    try {
			let { refreshToken } = req.cookies;
			let token = await AuthService.logout(refreshToken)
			res.clearCookie('refreshToken')
			res.json(token)
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
			let { refreshToken } = req.cookies;
			let userData = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 24 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
