import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

export function connectDb() {
  return mongoose.connect(dbURI)
}

// Deletes seeding database
export function truncateDb() {
  return mongoose.connection.db.dropDatabase()
}

// Disconnects seeding
export function disconnectDb() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}