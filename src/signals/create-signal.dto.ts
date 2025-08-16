import { ApiProperty } from '@nestjs/swagger';

export class CreateSignalDto {
  @ApiProperty({ example: 'My First Signal' })
  name: string;

  @ApiProperty({ example: 'This is my first test signal' })
  description: string;
}


