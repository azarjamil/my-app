import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}









