import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { XrayDocument } from './xray.schema';

@Injectable()
export class XrayConsumer {
  private readonly logger = new Logger(XrayConsumer.name);

  constructor(
    @InjectModel('Xray') private readonly xrayModel: Model<XrayDocument>,
  ) {}

  @RabbitSubscribe({
    exchange: '', // چون مستقیم از صف می‌گیریم، خالی میذاریم
    routingKey: 'xray',
    queue: 'xray',
  })
  public async handleMessage(msg: any) {
    this.logger.log(`📥 دریافت پیام: ${JSON.stringify(msg)}`);

    // ذخیره در دیتابیس
    const xray = new this.xrayModel(msg);
    await xray.save();

    this.logger.log('✅ پیام ذخیره شد');
  }
}






