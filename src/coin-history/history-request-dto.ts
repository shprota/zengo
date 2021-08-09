import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class HistoryRequestDto {
  @ApiProperty({
    description: 'A list of coin symbols to get the historical data for',
    example: ['BTC', 'ETH', 'BNB', 'DOGE'],
  })
  @IsString()
  @IsNotEmpty()
  coins: string;

  @ApiProperty({
    description: 'Target date for history comparison',
    example: 1452680400,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  date: string;
}
