import { Injectable, OnModuleInit, Inject, Logger } from '@nestjs/common';
import { Channel, ConsumeMessage } from 'amqplib';
import { AMQP_CHANNEL } from '../rabbitmq/rabbitmq.module';
import { XrayService } from '../xray/xray.service';

@Injectable()
export class XrayConsumer implements OnModuleInit {
  private readonly logger = new Logger(XrayConsumer.name);

  constructor(
    @Inject(AMQP_CHANNEL) private readonly channel: Channel,
    private readonly xrayService: XrayService
  ) {}

  async onModuleInit() {
    this.channel.consume('xray', (message: ConsumeMessage | null) => {
      if (message) {
        const content = JSON.parse(message.content.toString());
        this.xrayService.create(content);
        this.channel.ack(message);
      }
    });
  }
}





