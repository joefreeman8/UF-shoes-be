import express from 'express'
import products from '../controllers/products.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/shop')
  .get(products.index)

router.route('/shop/:productId')
  .get(products.show)

router.route('/products/:productId/basket')
  .post(secureRoute, products.basket)

router.route('/products/:productId/comments')
  .post(secureRoute, products.commentCreate)

router.route('/products/:productId/comments/:commentId')
  .delete(secureRoute, products.commentDelete)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

export default router