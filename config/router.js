import express from 'express'
import productsController from '../controllers/productsController.js'
import authController from '../controllers/authController.js'
import reviewsController from '../controllers/reviewsController.js'
import basketController from '../controllers/basketController.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

// ! Products Controllers
router.route('/shop')
  .get(productsController.index)

router.route('/shop/:productId')
  .get(productsController.show)

// ! Reviews Controllers
router.route('/shop/:productId/reviews')
  .post(secureRoute, reviewsController.createReview)

router.route('/shop/:productId/reviews/:reviewId')
  .put(secureRoute, reviewsController.updateReview)
  .delete(secureRoute, reviewsController.deleteReview)

//  ! Auth Controllers 
router.route('/register')
  .post(authController.register)

router.route('/login')
  .post(authController.login)

// ! Basket Controllers
// view basket
router.route('/basket/:userId')
  .get(secureRoute, basketController.viewBasket)


// toggle item to basket
router.route('/shop/:productId/basket')
  .put(secureRoute, basketController.toggleBasketItem)

// delete from basket
router.route('/basket/:userId/:productId')
  .delete(secureRoute, basketController.deleteBasketItem)


router.route('/basket')
  .delete(secureRoute, basketController.clearBasket)

export default router