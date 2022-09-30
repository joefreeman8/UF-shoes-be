import { NotFound, Unauthorized } from '../lib/errors.js'
import Product from '../models/product.js'

//* Controllers Middleware

//* products Index
async function productsIndex(_req, res) {
  const products = await Product.find()
  return res.status(200).json(products)
}

// * products Show
async function productsShow(req, res, next) {
  const { productsId } = req.params
  try {
    const productsToFind = await Product.findById(productsId)

    if (!productsToFind) {
      throw new NotFound()
    }
    return res.status(200).json(productsToFind)
  } catch (err) {
    next(err)
  }
}

// * Like / Adding to basket - Toggle
async function addToBasket(req, res, next){
  const { productsId } = req.params
  try {
    const productsToAddToBasket = await Product.findById(productsId)
    if (!productsToAddToBasket) {
      throw new NotFound()
    }
    const userId = req.currentUser._id
    console.log(userId)
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


// * COMMENTS
// * Create a Comment
async function productCommentCreate(req, res, next) {
  const { productId } = req.params
  const { currentUser } = req
  try {
    const commentedProduct = await Product.findById(productId) // find the product
    if (!commentedProduct) {
      throw new NotFound()
    }

    const createdComment = commentedProduct.comments.create({ ...req.body, addedBy: currentUser })
    commentedProduct.comments.push(createdComment) // push comment into array
    await commentedProduct.save() // save

    return res.status(201).json(commentedProduct)

  } catch (err) {
    next(err)
  }
}



export default {
  index: productsIndex,
  show: productsShow,
  basket: addToBasket,
  commentCreate: productCommentCreate,
}