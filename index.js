import express from 'express'


const app = express()

app.use(express.json())

async function startServer() {
  try {
    await connectDb()
    console.log('🤖🚀 Mongo is connected')
    app.listen(8000, () => console.log('🤖🚀 Listening on port: 8000'))
  } catch (err) {
    console.log('🤖❌ Something went wrong - is your mongo connected?')
    console.log(err)
  }
}

startServer()