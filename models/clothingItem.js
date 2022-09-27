import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'


const clothingItemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  // addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, // mongo id document which can be found in the user collection (same User set in models>user.js)
})

clothingItemSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Clothes', clothingItemSchema)