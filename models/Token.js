import { model, Schema } from "mongoose";

let tokenSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	refreshToken: {
		type: String,
		required: true
	}
})

export default model('token', tokenSchema)