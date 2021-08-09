import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CoinHistoryController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('Should validate input', () => {
    return request(app.getHttpServer())
      .get('/history?date=')
      .expect(400)
      .expect(
        '{"statusCode":400,"message":["coins should not be empty","coins must be a string","date must be a positive number"],"error":"Bad Request"}',
      );
  });
});
