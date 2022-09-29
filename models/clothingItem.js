import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'


const clothingItemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  likedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
})

clothingItemSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Clothes', clothingItemSchema)