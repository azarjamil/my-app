import { Injectable } from '@nestjs/common';
import { XrayService } from './xray.service';

@Injectable()
export class XrayProcessor {
  constructor(private readonly xrayService: XrayService) {}

  async processXrayData(data: any) {
    
    console.log('Processing XRAY data:', data);
    
    return this.xrayService.create(data);
  }
}








