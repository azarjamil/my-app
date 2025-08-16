import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SignalsModule } from './signals/signals.module';
import { XrayModule } from './xray/xray.module';
import { ProducerModule } from './producer/producer.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/mydb'),
    SignalsModule,
    XrayModule,
    ProducerModule,
    RabbitmqModule,
    SeedModule,
  ],
})
export class AppModule {}





































