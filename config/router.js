import express from 'express'
import productsController from '../controllers/productsController.js'
import authController from '../controllers/authController.js'
import reviewsController from '../controllers/reviewsController.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

// ! Products Cntrollers
router.route('/shop')
  .get(productsController.index)

router.route('/shop/:productId')
  .get(productsController.show)

// add item to basket
router.route('/shop/:productId/basket')
  .post(secureRoute, productsController.basket)


// ! Reviews Controllers
router.route('/shop/:productId/reviews')
  .post(secureRoute, reviewsController.createReview)

router.route('/shop/:productId/reviews/:reviewId')
  .put(secureRoute, reviewsController.updateReview)
  .delete(secureRoute, reviewsController.deleteReview)

//  ! Auth Controllers 
// view basket
router.route('/basket/:userId')
  .get(secureRoute, authController.basket)

router.route('/register')
  .post(authController.register)

router.route('/login')
  .post(authController.login)

export default router