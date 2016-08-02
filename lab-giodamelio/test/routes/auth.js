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
          expect(res.body._id).to.exist;
          expect(res.body.username).to.equal('AzureDiamond');
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
});
