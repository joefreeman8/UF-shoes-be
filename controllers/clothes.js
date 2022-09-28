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
  console.log(req)
  try {
    const clothesToFind = await Clothes.findById(clothesId)
    
    if (!clothesToFind) {
      throw new Error()
    }
    return res.status(200).json(clothesToFind)
  } catch (err) {
    next(err)
  }
}

export default {
  index: clothesIndex,
  show: clothesShow,
}