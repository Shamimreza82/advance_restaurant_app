import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis";

const connection =  getRedisConnection()

export const emailQueue = new Queue("emailQueue", { connection });


