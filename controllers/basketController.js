import { NotFound } from '../lib/errors.js'
import Product from '../models/product.js'

async function deleteBasketItem(req, res, next) {
  const { productId } = req.params

  try {
    const productToDeleteFromBasket = await Product.findById(productId)
    if (!productToDeleteFromBasket) {
      throw new NotFound()
    }
    const userId = req.currentUser._id

    if (productToDeleteFromBasket.likedBy.includes(userId)) {
      productToDeleteFromBasket.likedBy.remove(userId)
    }
    await productToDeleteFromBasket.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  deleteBasketItem
}