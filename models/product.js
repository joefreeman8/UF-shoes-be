import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 300 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})


const productSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  reviews: [reviewSchema], // embedded here so if the product gets deleted then so does the comment.
  likedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5 }
})

productSchema
  .virtual('avgRating')
  .get(function () {
    if (!this.reviews.length) return 0

    return Math.round(this.reviews.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0) / this.reviews.length)
  })

productSchema
  .set('toJSON', {
    virtuals: true,
  })

productSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Product', productSchema)