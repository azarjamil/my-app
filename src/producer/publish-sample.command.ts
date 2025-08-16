import { NestFactory } from '@nestjs/core';
import { ProducerModule } from './producer.module';
import { ProducerService } from './producer.service';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(ProducerModule);
  const producerService = appContext.get(ProducerService);

  const filePath = path.join(__dirname, '..', 'xray', 'data', 'sample-data.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(rawData);

  for (const deviceId of Object.keys(jsonData)) {
    const payload = {
      deviceId,
      ...jsonData[deviceId],
    };
    await producerService.sendToQueue('xray', payload);
    console.log(` Sent data for device ${deviceId} to queue "xray"`);
  }

  await appContext.close();
}

bootstrap();
