import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 300 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
} , {
  timestamps: true,
})


const productSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  comments: [commentSchema], // embedded here so if the product gets deleted then so does the comment.
  likedBy: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
})

productSchema
  .virtual('avgRating')
  .get(function() {
    if (!this.comments.length) return 'No Average Rating'

    return Math.round(this.comments.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0) / this.comments.length)
  })

productSchema
  .set('toJSON', {
    virtuals: true,
  })

productSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Product', productSchema)