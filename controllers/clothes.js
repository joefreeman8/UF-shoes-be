import { NotFound } from '../lib/errors.js'
import Clothes from '../models/clothingItem.js'

//* Controllers Middleware

//* Clothes Index
async function clothesIndex(_req, res) {
  const clothes = await Clothes.find()
  return res.status(200).json(clothes)
}

// * Clothes Show
async function clothesShow(req, res, next) {
  const { clothesId } = req.params
  try {
    const clothesToFind = await Clothes.findById(clothesId)

    if (!clothesToFind) {
      throw new NotFound()
    }
    return res.status(200).json(clothesToFind)
  } catch (err) {
    next(err)
  }
}

// * Like / Adding to basket - Toggle
async function addToBasket(req, res, next){
  const { clothesId } = req.params
  try {
    const clothesToAddToBasket = await Clothes.findById(clothesId)
    if (!clothesToAddToBasket) {
      throw new NotFound()
    }
    const userId = req.currentUser._id
    console.log(userId)
    if (clothesToAddToBasket.likedBy.includes(userId)) {
      clothesToAddToBasket.likedBy.remove(userId)
    } else {
      clothesToAddToBasket.likedBy.push(userId)
    }
    await clothesToAddToBasket.save()
    return res.status(202).json(clothesToAddToBasket)
  } catch (err) {
    next(err)
  }
}

export default {
  index: clothesIndex,
  show: clothesShow,
  basket: addToBasket,
}