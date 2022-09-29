import express from 'express'
import clothes from '../controllers/clothes.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/clothes')
  .get(clothes.index)

router.route('/clothes/:clothesId')
  .get(clothes.show)

router.route('/clothes/:clothesId/basket')
  .post(secureRoute, clothes.basket)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

export default router