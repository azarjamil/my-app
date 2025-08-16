import { Inject, Injectable } from '@nestjs/common';
import { AMQP_CHANNEL } from '../rabbitmq/rabbitmq.module';
import { Channel } from 'amqplib';

@Injectable()
export class ProducerService {
  constructor(
    @Inject(AMQP_CHANNEL) private readonly channel: Channel,
  ) {}

  async sendToQueue(queue: string, message: any) {
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`📤 Sent to queue "${queue}":`, message);
  }
}




