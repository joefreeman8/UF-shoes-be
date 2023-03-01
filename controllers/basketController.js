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
    const productsToAddToBasket = await Product.findById(productId)
    if (!productsToAddToBasket) {
      throw new NotFound()
    }
    const userId = req.currentUser._id
    console.log(req.currentUser)
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


// * Delete from Basket
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
  basket: basket,
  deleteBasketItem,
  toggleBasketItem
}