import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Xray E2E', () => {
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

  it('POST /xrays (create)', async () => {
    const response = await request(app.getHttpServer())
      .post('/xrays')
      .send({
        deviceId: 'device123',
        data: { testKey: 'testValue' },
      })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    createdId = response.body._id;
  });

  it('GET /xrays (findAll)', async () => {
    const response = await request(app.getHttpServer())
      .get('/xrays')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /xrays/:id (findOne)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/xrays/${createdId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', createdId);
  });

  it('PUT /xrays/:id (update)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/xrays/${createdId}`)
      .send({ data: { updatedKey: 'newValue' } })
      .expect(200);

    expect(response.body.data).toHaveProperty('updatedKey', 'newValue');
  });

  it('DELETE /xrays/:id (remove)', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/xrays/${createdId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', createdId);
  });
});








