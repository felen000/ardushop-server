import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";
import TokenService from "./TokenService.js";
import UserDto from "../dtos/userDto.js";
import ApiError from "../exceptions/apiError.js";

class AuthService {
  async registration(username, email, password, isSeller) {
    let candidate = await User.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest("Пользователь с такой почтой уже существует");
    }

    let hashPassword = bcrypt.hashSync(password, 8);
		let userRole
    if (isSeller) {
      userRole = await Role.findOne({ value: "SELLER" });
    } else {
      userRole = await Role.findOne({ value: "USER" });
    }
		let user = new User({
			username,
			email,
			password: hashPassword,
			roles: [userRole.value],
			image: "",
			settings: {
				emailNotifications: false,
				address: "",
			},
			cart: [],
		});

		await user.save();
    return await returnNewTokens(user);
  }

  async login(email, password) {
		let user = await User.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с такой почтой не найден");
    }

    let validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw ApiError.BadRequest("Введен неверный пароль");
    }

    return await returnNewTokens(user);
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    let userData = TokenService.validateRefreshToken(refreshToken);
    let tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      console.log(userData);
      console.log(tokenFromDb);

      throw ApiError.UnauthorizedError();
    }

    let user = await User.findById(userData.id);

    return await returnNewTokens(user);
  }
}

async function returnNewTokens(user) {
  let userDto = new UserDto(user);
  let tokens = TokenService.generateTokens({ ...userDto });
  await TokenService.saveToken(userDto.id, tokens.refreshToken);
  return {
    ...tokens,
    user: userDto,
  };
}

export default new AuthService();
