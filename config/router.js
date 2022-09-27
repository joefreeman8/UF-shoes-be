import express from 'express'
import clothes from '../controllers/clothes.js'

const router = express.Router()

router.route('/clothes')
  .get(clothes.index)


export default router