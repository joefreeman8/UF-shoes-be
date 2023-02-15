import Product from '../models/product.js'
import { NotFound, Unauthorized } from '../lib/errors.js'

async function createReview(req, res, next) {
  const { productId } = req.params
  const { currentUser } = req
  try {
    const product = await Product.findById(productId) // find the product

    if (!product) {
      throw new NotFound()
    }

    const createdReview = product.reviews.create({ ...req.body, addedBy: currentUser })
    product.reviews.push(createdReview) // push comment into array

    await product.save() // save

    return res.status(201).json(product)

  } catch (err) {
    next(err)
  }
}

async function updateReview(req, res, next) {
  const { productId, reviewId } = req.params
  const { currentUser } = req
  console.log("CONSOLE LOG", currentUser)
  try {
    const product = await Product.findById(productId)
    if (!product) {
      throw new NotFound()
    }

    const reviewToEdit = product.reviews.id(reviewId)
    if (!reviewToEdit) {
      throw new NotFound()
    }

    if (!reviewToEdit.addedBy.equals(currentUser._id)) {
      throw new Unauthorized()
    }

    reviewToEdit.set(req.body)
    await product.save()
    return res.status(202).json(product.reviews)
  } catch (err) {
    next(err)
  }
}

async function deleteReview(req, res, next) {
  const { productId, reviewId } = req.params
  const { currentUser } = req

  try {
    const product = await Product.findById(productId) // find the product
    if (!product) {
      throw new NotFound()
    }

    const reviewToDelete = product.reviews.id(reviewId) // find the review from the product above
    if (!reviewToDelete) {
      throw new NotFound()
    }
    if (!reviewToDelete.addedBy.equals(currentUser._id) && !req.currentUser.isAdmin) { // ensures only the owner of the review can delete
      throw new Unauthorized()
    }

    reviewToDelete.remove() // deletes review
    await product.save() // save
    return res.sendStatus(204) // send status to show success
  } catch (err) {
    next(err)
  }
}

export default {
  createReview,
  updateReview,
  deleteReview
}