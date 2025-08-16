import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Xray, XraySchema } from './xray.schema';
import { XrayService } from './xray.service';
import { XrayController } from './xray.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Xray.name, schema: XraySchema }])],
  controllers: [XrayController],
  providers: [XrayService],
  exports: [XrayService],
})
export class XrayModule {}






















