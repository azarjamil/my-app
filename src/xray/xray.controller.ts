import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { XrayService } from './xray.service';
import { Xray } from './xray.schema'; 
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Xrays')
@Controller('xrays')
export class XrayController {
  constructor(private readonly xrayService: XrayService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return all xrays', type: [Xray] })
  findAll() {
    return this.xrayService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a single xray', type: Xray })
  @ApiResponse({ status: 404, description: 'Xray not found' })
  findOne(@Param('id') id: string) {
    return this.xrayService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new xray', type: Xray })
  create(@Body() xray: Xray) {
    return this.xrayService.create(xray);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update a xray', type: Xray })
  update(@Param('id') id: string, @Body() xray: Xray) {
    return this.xrayService.update(id, xray);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a xray' })
  remove(@Param('id') id: string) {
    return this.xrayService.remove(id);
  }
}
















