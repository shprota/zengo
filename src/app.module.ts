import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinHistoryModule } from './coin-history/coin-history.module';

@Module({
  imports: [CoinHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
