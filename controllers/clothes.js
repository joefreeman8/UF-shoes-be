import Clothes from '../models/clothingItem'

//* Controllers Middleware

//* Clothes Index
async function clothesIndex(_req, res) {
  const clothes = await Clothes.find()
  return res.status(200).json(clothes)
}

export default {
  index: clothesIndex,

}