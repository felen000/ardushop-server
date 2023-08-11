import ApiError from '../exceptions/apiError.js';
import TokenService from '../services/TokenService.js';

export default function (roles) {

  return function (req, res, next) {
    if (req.method == 'OPTIONS') {
      next();
    }

    try {
      let token = req.headers.authorization.split(' ')[1];
      if (!token) {
				return next(ApiError.UnauthorizedError())
      }

      let {roles: userRoles} = TokenService.validateAccessToken(token);
      let hasRole = false

			userRoles.forEach(role => {
				if (roles.includes(role)) {
					hasRole = true
				}
			});

			if(!hasRole) {
				res.status(403).json({ message: 'Недостаточно прав для совершения операции' });
				return
			}

      next();
    } catch (e) {
      console.log(e);
      return next(ApiError.UnauthorizedError())
    }
  };
}
