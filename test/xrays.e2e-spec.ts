import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Xrays E2E', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/xrays (GET) should return 200', async () => {
    return request(app.getHttpServer())
      .get('/xrays')
      .expect(200);
  });

  it('/xrays (POST) should create a new xray', async () => {
    const response = await request(app.getHttpServer())
      .post('/xrays')
      .send({
        deviceId: 'test-device-123',
        data: { foo: 'bar', value: 42 },
      })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.deviceId).toBe('test-device-123');
    createdId = response.body._id;
  });

  it('/xrays/:id (GET) should return a single xray', async () => {
    return request(app.getHttpServer())
      .get(`/xrays/${createdId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('_id', createdId);
      });
  });

  it('/xrays/:id (PUT) should update a xray', async () => {
    return request(app.getHttpServer())
      .put(`/xrays/${createdId}`)
      .send({ data: { foo: 'baz', updated: true } })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.foo).toBe('baz');
        expect(res.body.data.updated).toBe(true);
      });
  });

  it('/xrays/:id (DELETE) should remove a xray', async () => {
    return request(app.getHttpServer())
      .delete(`/xrays/${createdId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(createdId);
      });
  });
});









