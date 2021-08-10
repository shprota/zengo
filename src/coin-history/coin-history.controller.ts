import { Controller, Get, Query } from '@nestjs/common';
import { HistoryRequestDto } from './history-request-dto';
import { CoinHistoryService } from './coin-history.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { HistoryResponseDto } from './history-response-dto';

@ApiTags('Coin price retrospective')
@Controller('history')
export class CoinHistoryController {
  constructor(private readonly coinService: CoinHistoryService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get change percentage for specified coins',
  })
  @ApiOkResponse({
    type: HistoryResponseDto,
    description: 'JSON object with coins as keys and percentage as values',
  })
  @ApiBadRequestResponse()
  getHistory(
    @Query() params: HistoryRequestDto,
  ): Observable<HistoryResponseDto> {
    const req: HistoryRequestDto = {
      coins: params.coins,
      date: params.date,
    };
    return this.coinService.getCoinsChange(req);
  }
}
