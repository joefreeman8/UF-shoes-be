import express from 'express'
import cors from 'cors'
import logger from './lib/logger.js'
import router from './config/router.js'
import errorHandler from './lib/errorHandler.js'

import { connectDb } from './db/helpers.js'
import { port } from './config/environment.js'


const app = express()

// Middleware 
app.use(express.json()) // body parsing logger - enables us to obtain the body from the request

app.use(cors())
app.use('/', logger) // logging middleware
app.use('/api', router)
app.use(errorHandler)

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