import User from "../models/User.js"
import path from 'node:path'
class UserService {
	async getUser(id) {
		let user = await User.findById(id)
		let userData = {
			username: user.username,
			email: user.email,
			image: user.image,
			settings: user.settings
		}
		return userData
	}

	async updateUser(id, userData, avatar) {
		if(avatar) {
			avatar.name = 'avatar' + id + avatar.name.slice(avatar.name.lastIndexOf('.'))
			let filePath = path.join(process.cwd(), 'public','images','avatars', avatar.name)
			avatar.mv(filePath)
			userData.image = avatar.name
		}
		let user = await User.findByIdAndUpdate(id, userData)

		return 'Профиль обновлён'
	}
}

export default new UserService()