import { ApiProperty } from '@nestjs/swagger';

export class SignalDto {
  @ApiProperty({ example: 'My First Signal' })
  name: string;

  @ApiProperty({ example: 'This is my test signal' })
  description?: string;

  @ApiProperty({ example: '2025-08-16T11:25:59.013Z' })
  createdAt: Date;
}
