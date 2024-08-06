import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT || 4000
export const dbURI = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1/ezis-db' // using 127.0.0.1 because localhost was not working.
export const secret = process.env.SECRET || 'this is my secret'