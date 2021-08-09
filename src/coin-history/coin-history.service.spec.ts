import { Test, TestingModule } from '@nestjs/testing';
import { CoinHistoryService } from './coin-history.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('CoinHistoryService', () => {
  let service: CoinHistoryService;
  let httpService: HttpService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CoinHistoryService],
    }).compile();

    service = module.get<CoinHistoryService>(CoinHistoryService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate percentage', (done) => {
    jest.spyOn(httpService, 'get').mockImplementation((url) => {
      return of({
        data: {
          USD: {
            BTC: url.indexOf('pricehistorical') > 0 ? 0.5 : 0.25,
            ETH: url.indexOf('pricehistorical') > 0 ? 2 : 3,
            BNB: url.indexOf('pricehistorical') > 0 ? 8 : 3,
            TEST: url.indexOf('pricehistorical') > 0 ? 8 : undefined,
          },
        },
        status: 200,
        statusText: '',
        headers: [],
        config: {},
      });
    });
    service
      .getCoinsChange({ coins: 'BTC,ETH,BNB', date: '1614038400' })
      .subscribe((res) => {
        expect(res['BTC']).toEqual(100);
        expect(res['ETH']).toEqual(-33.33);
        expect(res['BNB']).toEqual(166.67);
        expect(res['TEST']).toBeUndefined();
        done();
      });
  });
});
