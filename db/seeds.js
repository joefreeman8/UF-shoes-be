import { connectDb, disconnectDb, truncateDb } from './helpers.js'
import Product from '../models/product.js'
import productData from './data/product.js'
import User from '../models/user.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖🌱 Database Connected')

    await truncateDb()
    console.log('🤖🌱 Data Dropped')

    const user = await User.create({
      username: 'admin',
      email: 'admin@email.com',
      password: 'pass',
      passwordConfirmation: 'pass',
    })
    console.log('🤖🌱 Admin User Created')

    const productDataWithUsers = productData.map(product => {
      product.addedby = user
      return product
    })

    const createdProducts = await Product.create(productDataWithUsers)
    console.log(`🤖🌱 ${createdProducts.length} Product Items Created`)

  } catch (err) {
    console.log('🤖🌱❌ Something Went Wrong Seeding the DB')
    console.log(err)
  }

  await disconnectDb()
  console.log('🤖🌱 Database Disconnected, Goodbye!')
}

seed()