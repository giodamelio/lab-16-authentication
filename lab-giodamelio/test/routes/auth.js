const supertest = require('supertest-as-promised');

const server = require('../../lib/server');

describe('Auth', () => {
  describe('/api/signup', () => {
    it('Get the route', () =>
      supertest(server)
        .post('/api/signup')
        .send({
          username: 'AzureDiamond',
          password: 'hunter2',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({
          message: 'Hello World',
        })
    );
  });
});
