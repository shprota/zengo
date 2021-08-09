import { HttpException, Injectable } from '@nestjs/common';
import { HistoryRequestDto } from './history-request-dto';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';

@Injectable()
export class CoinHistoryService {
  constructor(private http: HttpService) {}

  getCoinsChange(req: HistoryRequestDto) {
    const currentUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD&tsyms=${req.coins}`;
    const histUrl = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=USD&tsyms=${req.coins}&ts=${req.date}`;
    const refCurrency = 'USD';

    return zip(this.http.get(currentUrl), this.http.get(histUrl)).pipe(
      map(([currentResp, historicalResp]) => ({
        current: currentResp.data[refCurrency],
        historical: historicalResp.data[refCurrency],
      })),
      map(({ current, historical }) => {
        if (!current || !historical) {
          throw new HttpException(
            'Invalid parameters. Cannot retrieve the specified coins data.',
            400,
          );
        }
        const result = {};
        for (const coin of Object.keys(current)) {
          result[coin] =
            historical[coin] && current[coin]
              ? Math.round(
                  ((historical[coin] - current[coin]) / current[coin]) * 10000,
                ) / 100
              : undefined;
        }
        return result;
      }),
    );
  }
}
