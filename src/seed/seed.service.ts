import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal } from '../signals/signal.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel('Signal') private readonly signalModel: Model<Signal>,
  ) {}

  async seedSignalsFromFile() {
    try {
      // مسیر فایل sample-data.json (ثابت روی src/xray/data)
      const filePath = path.join(process.cwd(), 'src', 'xray', 'data', 'sample-data.json');

      const rawData = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(rawData);

      for (const deviceId of Object.keys(jsonData)) {
        const data = jsonData[deviceId];

        const newSignal = new this.signalModel({
          deviceId,
          time: new Date(data.time),
          dataLength: data.data.length,
          dataVolume: data.data.length * 1.16, 
        });

        await newSignal.save();
        console.log(` Signal for device ${deviceId} inserted.`);
      }
    } catch (err) {
      console.error(' Error seeding signals:', err.message);
    }
  }
}































