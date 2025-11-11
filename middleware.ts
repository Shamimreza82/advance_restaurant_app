
import { NextResponse } from "next/server";




export async function middleware() {
    // getRedisConntion()
  // Initialize Redis connection when the first request comes in
//   const redis = getRedisConnection();

//   // Optionally ping once to ensure it's alive
//   try {
//     await redis.ping();
//     console.log("🚀 Redis connected during middleware init");
//   } catch (err) {
//     console.error("❌ Redis failed to connect:", err);
//   }

  return NextResponse.next();
 
}

// export const config = {
//   matcher: "/", // or "/*" if you want it to run for all routes
// };
