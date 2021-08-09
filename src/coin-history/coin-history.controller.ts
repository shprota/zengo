import { Controller, Get, Query } from '@nestjs/common';
import { HistoryRequestDto } from './history-request-dto';
import { CoinHistoryService } from './coin-history.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('history')
export class CoinHistoryController {
  constructor(private readonly coinService: CoinHistoryService) {}

  @Get('/')
  getHistory(@Query() params: HistoryRequestDto) {
    const req: HistoryRequestDto = {
      coins: params.coins,
      date: params.date,
    };
    return this.coinService.getCoinsChange(req);
  }
}
