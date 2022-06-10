import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

const connectDb = async () => mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

export default connectDb
