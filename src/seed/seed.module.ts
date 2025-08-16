import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { Signal, SignalSchema } from '../signals/signal.schema';
import { Xray, XraySchema } from '../xray/xray.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Signal.name, schema: SignalSchema },
      { name: Xray.name, schema: XraySchema },
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService], 
})
export class SeedModule {}







