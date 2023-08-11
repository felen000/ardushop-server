import UserService from "../services/UserService.js"

class UserController {
	async getUser(req, res, next) {
		try {
			let user = await UserService.getUser(req.params.id)
			res.json(user)
		} catch (e) {
			next(e)
		}
	}

	async updateUser (req, res, next) {
		try {
			let avatar
			if(req.files) {
				avatar = req.files.avatar
			}
			let { id, userData } = req.body
			userData = JSON.parse(userData)
			let message =  await UserService.updateUser(id, userData, avatar)
			// console.log(avatar, id, userData)
			res.json({message})
		} catch (e) {
			next(e)
		}
	}
}

export default new UserController()