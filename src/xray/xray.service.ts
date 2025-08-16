import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Xray, XrayDocument } from './xray.schema';

@Injectable()
export class XrayService {
  constructor(
    @InjectModel(Xray.name) private xrayModel: Model<XrayDocument>,
  ) {}

  async create(createXrayDto: Partial<Xray>): Promise<Xray> {
    const created = new this.xrayModel(createXrayDto);
    return created.save();
  }

  async findAll(): Promise<Xray[]> {
    return this.xrayModel.find().exec();
  }

  async findOne(id: string): Promise<Xray> {
    const xray = await this.xrayModel.findById(id).exec();
    if (!xray) throw new NotFoundException(`Xray with ID ${id} not found`);
    return xray;
  }

  async update(id: string, updateXrayDto: Partial<Xray>): Promise<Xray> {
    const updated = await this.xrayModel
      .findByIdAndUpdate(id, updateXrayDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Xray with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<Xray> {
    const deleted = await this.xrayModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Xray with ID ${id} not found`);
    return deleted;
  }
}




















