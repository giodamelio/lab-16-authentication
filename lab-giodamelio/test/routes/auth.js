const supertest = require('supertest-as-promised');
const expect = require('chai').expect;

const server = require('../../lib/server');
const User = require('../../lib/models/user');

describe('Auth', () => {
  describe('/api/signup', () => {
    beforeEach(() => (
      new User({
        username: 'giodamelio',
        auth: {
          email: 'giodamelio@gmail.com',
          password: 'hunter2',
        },
      }).save()
    ));

    afterEach(() => (
      User.remove({})
    ));

    it('Create new user', () =>
      supertest(server)
        .post('/api/signup')
        .send({
          username: 'AzureDiamond',
          email: 'azure.diamond@hotmail.com',
          password: 'hunter2',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.token).to.exist;
        })
    );

    it('Try to create a user that already exists', () =>
      supertest(server)
        .post('/api/signup')
        .send({
          username: 'giodamelio',
          email: 'giodamelio@gmail.com',
          password: 'hunter2',
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Invalid user data',
        })
    );
  });

  describe('/api/signin', () => {
    beforeEach(() => (
      new User({
        username: 'giodamelio',
        auth: {
          email: 'giodamelio@gmail.com',
          password: 'hunter2',
        },
      }).save()
    ));

    afterEach(() => (
      User.remove({})
    ));

    it('Sign in to an existing user', () =>
      supertest(server)
        .get('/api/signin')
        .auth('giodamelio@gmail.com', 'hunter2')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.token).to.exist;
        })
    );

    it('Sign in to a user that does not exist', () =>
      supertest(server)
        .get('/api/signin')
        .auth('IDoNotExist', 'hunter2')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect({
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Invalid token',
        })
    );

    it('Sign in to a user with incorrect username', () =>
      supertest(server)
        .get('/api/signin')
        .auth('giodamelio@gmail.com', 'hunter3')
        .expect(401)
        .expect('Content-Type', /json/)
        .expect({
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Invalid token',
        })
    );

    it('Send invalid authorization header', () =>
      supertest(server)
        .get('/api/signin')
        .set('Authorization', 'InValidTokenFormat')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Invalid authorization header',
        })
    );
  });
});
