"use server"

import { Worker } from "bullmq";
import { sendEmail } from "../config/nodemailer";
import { getRedisConnection } from "../config/redis";


const connection = getRedisConnection()
export const runtime = 'nodejs'

const worker = new Worker("emailQueue",  async (job) => {
    const { to, subject, html } = job.data;
 console.log(to)
  await sendEmail(to, subject, html)

    console.log(`✅ Email sent to ${to}`);
  }, { connection }
 
);

worker.on("completed", (job) => console.log(`🎉 Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error(`❌ Job ${job?.id} failed:`, err));
