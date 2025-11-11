import IORedis from "ioredis";

let connection: IORedis | null = null;

export function getRedisConnection() {
  if (!connection) {
    connection = new IORedis({
      host: "redis-14012.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
      port: 14012,
      username: "default",
      password: process.env.REDIS_PASS,
  
    });

    // ✅ Add event listeners for debugging
    connection.on("connect", () => console.log("🟢 Redis is connecting..."));
    connection.on("ready", () => console.log("✅ Redis connection is ready!"));
    connection.on("error", (err) => console.error("❌ Redis connection error:", err));
    connection.on("close", () => console.warn("⚠️ Redis connection closed."));
  }

  return connection;
}








