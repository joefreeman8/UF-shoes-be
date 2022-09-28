import express from 'express'
import clothes from '../controllers/clothes.js'

const router = express.Router()

router.route('/clothes')
  .get(clothes.index)

router.route('/clothes/:clothesId')
  .get(clothes.show)
  
export default router