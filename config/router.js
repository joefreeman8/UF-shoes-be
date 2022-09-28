import express from 'express'
import clothes from '../controllers/clothes.js'
import auth from '../controllers/auth.js'


const router = express.Router()

router.route('/clothes')
  .get(clothes.index)

router.route('/clothes/:clothesId')
  .get(clothes.show)

router.route('/register')
  .post(auth.register)


export default router