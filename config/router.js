import express from 'express'
import productsController from '../controllers/productsController.js'
import authController from '../controllers/authController.js'
import reviewsController from '../controllers/reviewsController.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/shop')
  .get(productsController.index)

router.route('/shop/:productId')
  .get(productsController.show)

router.route('/products/:productId/basket')
  .post(secureRoute, productsController.basket)

router.route('/products/:productId/reviews')
  .post(secureRoute, reviewsController.createReview)

router.route('/products/:productId/reviews/:reviewId')
  .put(secureRoute, reviewsController.updateReview)
  .delete(secureRoute, reviewsController.deleteReview)

router.route('/register')
  .post(authController.register)

router.route('/login')
  .post(authController.login)

export default router