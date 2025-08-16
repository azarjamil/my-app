import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Signals E2E (AppController)', () => {
  let app: INestApplication;

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

  it('GET / (root)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  let createdId: string;

  it('POST /signals (create)', async () => {
    const response = await request(app.getHttpServer())
      .post('/signals')
      .send({
        deviceId: 'testDevice123',
        time: new Date().toISOString(),
        dataLength: 120,
        dataVolume: 250.75,
      })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    createdId = response.body._id;
  });

  it('GET /signals (findAll)', () => {
    return request(app.getHttpServer())
      .get('/signals')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });

  it('GET /signals/:id (findOne)', async () => {
    return request(app.getHttpServer())
      .get(`/signals/${createdId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('_id', createdId);
      });
  });

  it('PUT /signals/:id (update)', () => {
    return request(app.getHttpServer())
      .put(`/signals/${createdId}`)
      .send({ dataLength: 555 })
      .expect(200)
      .expect((res) => {
        expect(res.body.dataLength).toBe(555);
      });
  });

  it('DELETE /signals/:id (remove)', () => {
    return request(app.getHttpServer())
      .delete(`/signals/${createdId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(createdId);
      });
  });
});


