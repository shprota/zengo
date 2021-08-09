import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class HistoryRequestDto {
  @ApiProperty({
    description: 'A list of coin symbols to get the historical data for',
    example: 'BTC,ETH,BNB,DOGE',
  })
  @IsString()
  @IsNotEmpty()
  coins: string;

  @ApiProperty({
    description: 'Target date for history comparison',
    example: '2020-04-22',
  })
  @IsString()
  @IsNotEmpty()
  @IsISO8601()
  date: string;
}
