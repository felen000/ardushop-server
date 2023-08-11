import mongoose from 'mongoose';

let roleSchema = new mongoose.Schema({
  value: {
		type: String,
		unique: true,
		default: 'USER'
	}
});

export default mongoose.model('role', roleSchema);
