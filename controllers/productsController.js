import { NotFound } from '../lib/errors.js'
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
      .populate('reviews.addedBy')

    if (!productsToFind) {
      throw new NotFound()
    }
    return res.status(200).json(productsToFind)
  } catch (err) {
    next(err)
  }
}




export default {
  index: productsIndex,
  show: productsShow,
}