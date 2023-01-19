import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import User from '../models/user.js'
import { Unauthorized } from './errors.js'

async function secureRoute(req, _res, next) {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized()
    }

    const token = req.headers.authorization.replace('Bearer ', '')

    const payload = jwt.verify(token, secret)

    const user = await User.findById(payload.userId)

    if (!user) {
      throw new Unauthorized()
    }

    req.currentUser = user._id // any middleware accessed after secureRoute, will have access to req.currentUser

    next()
  } catch (err) {
    next(err)
  }
}

export default secureRoute