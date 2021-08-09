import { Controller, Get, Query } from '@nestjs/common';
import { HistoryRequestDto } from './history-request-dto';
import { CoinHistoryService } from './coin-history.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('history')
export class CoinHistoryController {
  constructor(private readonly coinService: CoinHistoryService) {}

  @Get('/')
  @ApiQuery({
    description: 'List of currencies',
    name: 'coins',
    example: 'BTC,ETH,BNB,DOGE',
    required: true,
    allowEmptyValue: false,
  })
  @ApiQuery({
    description: 'Timestamp of the comparison point (epoch seconds)',
    name: 'date',
    example: 1452680400,
    required: true,
    allowEmptyValue: false,
  })
  getHistory(@Query() params: HistoryRequestDto) {
    const req: HistoryRequestDto = {
      coins: params.coins,
      date: params.date,
    };
    return this.coinService.getCoinsChange(req);
  }
}
