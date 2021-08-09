import { Module } from '@nestjs/common';
import { CoinHistoryController } from './coin-history.controller';
import { CoinHistoryService } from './coin-history.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CoinHistoryController],
  providers: [CoinHistoryService],
})
export class CoinHistoryModule {}
