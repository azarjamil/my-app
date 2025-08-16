import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal } from './signal.schema';
import { CreateSignalDto } from './create-signal.dto';
import { UpdateSignalDto } from './update-signal.dto';

@Injectable()
export class SignalsService {
  constructor(
    @InjectModel(Signal.name) private signalModel: Model<Signal>,
  ) {}

  async create(createSignalDto: CreateSignalDto): Promise<Signal> {
    const createdSignal = new this.signalModel(createSignalDto);
    return createdSignal.save();
  }

  async findAll(): Promise<Signal[]> {
    return this.signalModel.find().exec();
  }

  async findOne(id: string): Promise<Signal | null> {
    return this.signalModel.findById(id).exec();
  }

  async update(id: string, updateSignalDto: UpdateSignalDto): Promise<Signal | null> {
    return this.signalModel.findByIdAndUpdate(id, updateSignalDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Signal | null> {
    return this.signalModel.findByIdAndDelete(id).exec();
  }
}








