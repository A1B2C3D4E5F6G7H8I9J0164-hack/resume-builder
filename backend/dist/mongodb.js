import mongoose from 'mongoose';
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
async function dbConnect() {
    let MONGODB_URI = process.env.MONGODB_URI?.trim();
    if (!MONGODB_URI) {
        console.error('CRITICAL ERROR: MONGODB_URI is missing or empty.');
        throw new Error('Please define the MONGODB_URI environment variable (check your .env or Render dashboard)');
    }
    // Aggressive cleaning: Remove any literal quotes that might have been pasted accidentally
    MONGODB_URI = MONGODB_URI.replace(/^["']|["']$/g, '').trim();
    // Production-ready logging (safe)
    console.log(`[Database] Attempting connection. URI starts with: ${MONGODB_URI.substring(0, 15)}...`);
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    }
    catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
export default dbConnect;
