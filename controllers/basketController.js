import User from '../models/user.js'
import { NotFound } from '../lib/errors.js'
import Product from '../models/product.js'

//*  Reverse relationship so the user can see all the products they liked/added to basket: 
async function basket(req, res, next) {
  const { userId } = req.params
  try {
    const user = await User.findById(userId).populate('basket')

    if (!user) {
      throw new NotFound()
    }
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}



// * Adding to basket - Toggle
async function toggleBasketItem(req, res, next) {
  const { productId } = req.params
  try {
    const product = await Product.findById(productId)
    if (!product) {
      throw new NotFound()
    }
    const userId = req.currentUser._id

    const alreadyInBasket = product.basket.includes(userId)

    const updateBasket = await Product.findByIdAndUpdate(productId, {
      [alreadyInBasket ? '$pull' : '$addToSet']: { basket: userId }
    }, { new: true })

    return res.status(202).json(updateBasket)
  } catch (err) {
    next(err)
  }
}


// * Delete from Basket
async function deleteBasketItem(req, res, next) {
  const { productId } = req.params

  try {
    const productToDeleteFromBasket = await Product.findById(productId)
    if (!productToDeleteFromBasket) {
      throw new NotFound()
    }
    const userId = req.currentUser._id

    if (productToDeleteFromBasket.basket.includes(userId)) {
      productToDeleteFromBasket.basket.remove(userId) // potentially need to change this to deleteOne()
    }
    await productToDeleteFromBasket.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function clearBasket(req, res, next) {
  const userId = req.currentUser._id
  try {
    const products = await Product.updateMany(
      { basket: userId },
      { $pull: { basket: userId } }
    )

    if (!products) {
      throw new NotFound()
    }

    res.sendStatus(204)

  } catch (err) {
    next(err)
  }
}

export default {
  viewBasket: basket,
  deleteBasketItem,
  toggleBasketItem,
  clearBasket
}