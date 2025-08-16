import * as amqp from 'amqplib';
import * as fs from 'fs';
import * as path from 'path';

async function publishSample() {
  const url = process.env.RABBITMQ_URL || 'amqp://localhost';
  const queue = process.env.XRAY_QUEUE || 'x-ray';

  // مسیر دقیق فایل داده سمپل
  const samplePath = path.join(__dirname, 'data', 'sample-data.json');
  const data = JSON.parse(fs.readFileSync(samplePath, 'utf8'));

  // اتصال به RabbitMQ
  const conn = await amqp.connect(url);
  const ch = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true });

  // ارسال پیام
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  console.log(`✅ Sample data sent to queue "${queue}"`);

  await ch.close();
  await conn.close();
}

// اجرا
publishSample().catch(console.error);

