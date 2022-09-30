import express from 'express'
import products from '../controllers/products.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/products')
  .get(products.index)

router.route('/products/:productsId')
  .get(products.show)

router.route('/products/:productsId/basket')
  .post(secureRoute, products.basket)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

export default router