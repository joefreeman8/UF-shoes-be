import User from '../models/user.js'

async function register(req, res) {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    console.log(err)
  }
}

export default {
  register,
}