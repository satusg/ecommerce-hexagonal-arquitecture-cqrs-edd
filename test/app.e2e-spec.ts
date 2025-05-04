// test/app.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { v7 as uuidv7 } from 'uuid';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
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

  it('POST /users → 201 Created sin body', async () => {
    const id = uuidv7();
    const user = {
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: `john.doe.${id}@example.com`,
      password: 'SecurePass123',
      role: 'customer',
    };

    await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201)
      .expect(res => {
        if (Object.keys(res.body).length !== 0) {
          throw new Error(
            `Se esperaba cuerpo vacío, pero llegó: ${JSON.stringify(res.body)}`
          );
        }
      });
  });

  it('GET /users/:id → 200 OK y datos correctos', async () => {
    const id = uuidv7();
    const user = {
      id,
      firstName: 'Jane',
      lastName: 'Smith',
      email: `jane.smith.${id}@example.com`,
      password: 'SecurePass123',
      role: 'customer',
    };

    // Crea el usuario para este test
    await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    // Y luego lo consulta
    const res = await request(app.getHttpServer())
      .get(`/users/${id}`)
      .expect(200);

    expect(res.body).toMatchObject({
      id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      createdAt: expect.any(String),
    });
  });

  it('GET /users → 200 OK y al menos un usuario en la lista', async () => {
    const id = uuidv7();
    const user = {
      id,
      firstName: 'Alice',
      lastName: 'Wong',
      email: `alice.wong.${id}@example.com`,
      password: 'SecurePass123',
      role: 'customer',
    };

    // Crea un usuario para garantizar que al listar siempre haya al menos uno
    await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);

    const res = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(res.body.users)).toBe(true);
    // Verifica que nuestro usuario aparezca en la lista
    expect(res.body.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
        }),
      ])
    );
  });
});
