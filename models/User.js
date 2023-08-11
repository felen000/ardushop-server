import mongoose from "mongoose";

let settingsSchema = new mongoose.Schema({
 emailNotifications: Boolean,
  address: String,
});

let cartSchema = new mongoose.Schema({
  productInfo: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "product",
  },
	count: {
		type: Number,
		default: 1
	}
});

let userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  settings: settingsSchema,
  cart: [cartSchema],
  roles: [{ type: String, ref: "Role" }],
	wishList: [{ type: mongoose.SchemaTypes.ObjectId, ref: "product" }]
});

export default mongoose.model("user", userSchema);
