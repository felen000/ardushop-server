import ApiError from '../exceptions/apiError.js';
import TokenService from '../services/TokenService.js';



export default function (req, res, next)  {
	if (req.method == 'OPTIONS') {
		next()
	}

	try {
		let token = req.headers.authorization.split(' ')[1]
		if(!token) {
			return next(ApiError.UnauthorizedError())
		}

		let userData = TokenService.validateAccessToken(token)
		if(!userData) {
			return next(ApiError.UnauthorizedError())
		}
		req.user = userData

		next()
	} catch (e) {
		console.log(e)
		return next(ApiError.UnauthorizedError())
	}
}