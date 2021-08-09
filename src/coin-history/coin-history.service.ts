import { HttpException, Injectable } from '@nestjs/common';
import { HistoryRequestDto } from './history-request-dto';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';

@Injectable()
export class CoinHistoryService {
  constructor(private http: HttpService) {}

  getCoinsChange(req: HistoryRequestDto) {
    const ts = Date.parse(req.date) / 1000; // Should use date-fns or the like to avoid passing 2020-02-31
    const currentUrl = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD&tsyms=${req.coins}`;
    const histUrl = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=USD&tsyms=${req.coins}&ts=${ts}`;
    const refCurrency = 'USD';

    return zip(this.http.get(currentUrl), this.http.get(histUrl)).pipe(
      map(([currentResp, historicalResp]) => {
        const current = currentResp.data[refCurrency];
        const historical = historicalResp.data[refCurrency];
        if (current && historical) {
          return this.calculatePercents(current, historical);
        }
        throw new HttpException(
          'Invalid parameters. Cannot retrieve the specified coins data.',
          400,
        );
      }),
    );
  }

  private calculatePercents(current, historical) {
    return Object.keys(current).reduce((result, coin) => {
      if (historical[coin] && current[coin]) {
        result[coin] =
          Math.round(
            ((historical[coin] - current[coin]) / current[coin]) * 10000,
          ) / 100;
      }
      return result;
    }, {});
  }
}
