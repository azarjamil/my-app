const amqp = require('amqplib');

async function sendTestMessage() {
  const queue = 'x-ray';
  const message = {
    deviceId: 'device-123',
    time: Date.now(),
    data: [
      [1, [35.6892, 51.3890, 100]],
      [2, [35.6893, 51.3891, 110]],
      [3, [35.6894, 51.3892, 105]],
    ]
  };

  try {
    const conn = await amqp.connect('amqp://localhost');
    const ch = await conn.createChannel();
    await ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(` Sent test message to queue "${queue}"`);
    await ch.close();
    await conn.close();
  } catch (err) {
    console.error(' Error sending test message', err);
  }
}

sendTestMessage();
