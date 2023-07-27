import { connectDb, disconnectDb, truncateDb } from './helpers.js'
import Product from '../models/product.js'
import productData from './data/product.js'
import User from '../models/user.js'

async function seed() {
  try {
    await connectDb()
    console.log('🤖🌱 Database Connected')

    // ! This worked when having DB stored locally, however error below occurs when storing db on mongoDB
    // * MongoServerError: user is not allowed to do action [dropDatabase] on [urban-footwear-db.]
    // await truncateDb()
    // console.log('🤖🌱 Data Dropped')

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true
    })
    console.log('🤖🌱 Admin User Created')

    const productDataWithUsers = productData.map(product => {
      product.addedBy = adminUser
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