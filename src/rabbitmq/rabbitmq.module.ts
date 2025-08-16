import { Global, Module } from '@nestjs/common';
import * as amqp from 'amqplib';

export const AMQP_CONNECTION = 'AMQP_CONNECTION';
export const AMQP_CHANNEL = 'AMQP_CHANNEL';

@Global()
@Module({
  providers: [
    {
      provide: AMQP_CONNECTION,
      useFactory: async () => {
        const url = process.env.RABBITMQ_URL || 'amqp://localhost';
        console.log(` Connecting to RabbitMQ at ${url}...`);
        const connection = await amqp.connect(url);
        console.log(' Connected to RabbitMQ');
        return connection;
      },
    },
    {
      provide: AMQP_CHANNEL,
      useFactory: async (conn: amqp.Connection) => {
        const channel = await conn.createChannel();

        const queueName = 'xray';
        await channel.assertQueue(queueName, { durable: true });
        console.log(` Queue "${queueName}" is ready`);

        return channel;
      },
      inject: [AMQP_CONNECTION],
    },
  ],
  exports: [AMQP_CHANNEL], 
})
export class RabbitmqModule {}





















