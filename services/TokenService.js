import "dotenv/config";
import jwt from "jsonwebtoken";
import Token from "../models/Token.js";

class TokenService {
  generateTokens(payload) {
    let accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "300s",
    });
    let refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    let tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    let token = await Token.create({
      user: userId,
      refreshToken,
    });

    return token;
  }

  async removeToken(refreshToken) {
    let tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      let userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData
    } catch (e) {
			return null;
    }
  }

  validateRefreshToken(token) {
		try {
			let userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData
    } catch (e) {
			console.log('validateRefresh', e)
      return null;
    }
  }

  async findToken(refreshToken) {
    let tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
