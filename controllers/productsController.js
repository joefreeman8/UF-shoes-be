import { NotFound, Unauthorized } from '../lib/errors.js'
import Product from '../models/product.js'

//* Controllers Middleware

//* Products Index
async function productsIndex(_req, res) {
  const products = await Product.find()
  return res.status(200).json(products)
}

// * Products Show
async function productsShow(req, res, next) {
  const { productId } = req.params
  try {
    const productsToFind = await Product.findById(productId)
      .populate('addedBy')

    if (!productsToFind) {
      throw new NotFound()
    }
    return res.status(200).json(productsToFind)
  } catch (err) {
    next(err)
  }
}

// * Like / Adding to basket - Toggle
async function addToBasket(req, res, next) {
  const { productId } = req.params
  try {
    const productsToAddToBasket = await Product.findById(productId)
    if (!productsToAddToBasket) {
      throw new NotFound()
    }
    const userId = req.currentUser._id
    if (productsToAddToBasket.likedBy.includes(userId)) {
      productsToAddToBasket.likedBy.remove(userId)
    } else {
      productsToAddToBasket.likedBy.push(userId)
    }
    await productsToAddToBasket.save()
    return res.status(202).json(productsToAddToBasket)
  } catch (err) {
    next(err)
  }
}




export default {
  index: productsIndex,
  show: productsShow,
  basket: addToBasket,
}