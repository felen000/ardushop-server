import mongoose from 'mongoose';

let productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categories:{
		type: [String],
		required: true
	},
  type: {
		type: String,
		required: true
	},
  description: {
		type: String,
		required: true
	},
	seller: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'user'
	}
});

export default mongoose.model('product', productSchema);
