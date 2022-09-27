import express from 'express'
import logger from './lib/logger.js'

import { connectDb } from './db/helpers.js'
import { port } from './config/environment.js'


const app = express()

app.use(express.json())
app.use('/', logger)
app.use('/api', express.Router())

async function startServer() {
  try {
    await connectDb()
    console.log('🤖🚀 Mongo is connected')
    app.listen(port, () => console.log(`🤖🚀 Listening on port: ${port}`))
  } catch (err) {
    console.log('🤖❌ Something went wrong - is your mongo connected?')
    console.log(err)
  }
} 

startServer()