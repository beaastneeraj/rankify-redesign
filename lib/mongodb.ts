import mongoose from 'mongoose'

const MONGODB_URI = "mongodb+srv://neeraj:pBXeezRCb24zgiuj@cluster0.tgygatf.mongodb.net/vaib?retryWrites=true&w=majority&appName=Cluster0"

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }
  
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      family: 4 // Force IPv4
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB')
        
        // Handle connection errors
        mongoose.connection.on('error', (err) => {
          console.error('MongoDB connection error:', err)
        })
        
        mongoose.connection.on('disconnected', () => {
          console.warn('MongoDB disconnected. Attempting to reconnect...')
          cached.promise = null // Reset the promise to force reconnection
          cached.conn = null
        })
        
        return mongoose
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err)
        cached.promise = null // Reset on error to try again
        throw err
      })
  }
  
  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export default connectDB
