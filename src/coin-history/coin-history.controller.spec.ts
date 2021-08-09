import { Test, TestingModule } from '@nestjs/testing';
import { CoinHistoryController } from './coin-history.controller';
import { HttpModule } from '@nestjs/axios';
import { CoinHistoryService } from './coin-history.service';

describe('CoinHistoryController', () => {
  let controller: CoinHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CoinHistoryController],
      providers: [CoinHistoryService],
    }).compile();

    controller = module.get<CoinHistoryController>(CoinHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
