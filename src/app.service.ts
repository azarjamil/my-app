import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {

  async onModuleInit() {
    const testMessage = {
      deviceId: '66bb584d4ae73e488c30a072',
      data: [[762, [51.339764, 12.339223833333334, 1.2038]]],
      time: Date.now(),
    };

    console.log('Module initialized. Test message:', testMessage);
  }

  getHello(): string {
    return 'Hello World!';
  }
}

