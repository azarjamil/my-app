import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SignalsService } from './signals.service';
import { CreateSignalDto } from './create-signal.dto';
import { UpdateSignalDto } from './update-signal.dto';

@ApiTags('Signals')
@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Signal created' })
  create(@Body() createSignalDto: CreateSignalDto) {
    return this.signalsService.create(createSignalDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all signals' })
  findAll() {
    return this.signalsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a single signal' })
  findOne(@Param('id') id: string) {
    return this.signalsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update a signal' })
  update(@Param('id') id: string, @Body() updateSignalDto: UpdateSignalDto) {
    return this.signalsService.update(id, updateSignalDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a signal' })
  remove(@Param('id') id: string) {
    return this.signalsService.remove(id);
  }
}












