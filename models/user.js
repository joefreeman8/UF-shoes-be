import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
// import mongooseUniqueValidator from 'mongoose-unique-validator'


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxLength: 50 },
  isAdmin: { type: Boolean },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})


// Virtual schema to add products to basket (same as a like button)
userSchema
  .virtual('basket', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'basket',
  })
  .get(function (basketProducts) {
    if (!basketProducts) return "Basket is empty"

    return basketProducts.map(product => ({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
    }))
  })


// Removes the password whenever a document is converted back into JSON
userSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, json) {
    delete json.password
    return json
  },
})

// Virtual field used to check the passwordConfirmation against the password in the schema above.
userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) { // can't use an arrow function if you want to use the 'this' keyword on the line below
    this._passwordConfirmation = passwordConfirmation // this assigns the value "passwordConfirmation" to the virtual field
  })

// Mongo Middleware to check the data provided for registering
// pre validation, checking to see if the passwords DO NOT match. 
userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Does Not Match')
    }
    next()
  })

// pre save, hashing the password takes place here. This hashes the password before saving. 
userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

// compares password user has provided with hashed password saved, to log them in. 
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)