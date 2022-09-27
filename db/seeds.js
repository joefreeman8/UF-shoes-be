import { connectDb, disconnectDb, truncateDb } from './helpers.js'
import Clothes from '../models/clothingItem.js'
import clothingItemData from './data/clothingItem.js'
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

    const clothingDataWithUsers = clothingItemData.map(clothingItem => {
      clothingItem.addedby = user
      return clothingItem
    })

    const createdClothes = await Clothes.create(clothingDataWithUsers)
    console.log(`🤖🌱 ${createdClothes.length} Clothing Items Created`)

  } catch (err) {
    console.log('🤖🌱❌ Something Went Wrong Seeding the DB')
    console.log(err)
  }

  await disconnectDb()
  console.log('🤖🌱 Database Disconnected, Goodbye!')
}

seed()