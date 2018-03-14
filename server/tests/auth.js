import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
const BASE_URL = '/api/v1';


describe('test for routes', () => {
  // Path auth/signup
  describe(`${BASE_URL}/auth/signup`, () => {
    // Method POST
    const path = `${BASE_URL}/auth/signup`;
    describe('POST', () => {
      // All requests are okay
      it('should return a success status and object of user', (done) => {
        chai.request(app)
          .post(path)
          .send({
            name: 'John David', email: 'email@yahoo.com', phone: '08164488989', password: 'password', confirmPassword: 'password',
          })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.data.user).to.include({ name: 'John David' });
            done();
          });
      });

      it('should return Unprocessable entity code for missing required variables', (done) => {
        chai.request(app)
          .post(path)
          .send({
            name: 'John David', password: 'password', confirmPassword: 'password',
          })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.status).to.equal('fail');
            expect(res.body.data).to.have.all.keys('email', 'phone');
            done();
          });
      });


      it('should return Unprocessable entity code for password not matching', (done) => {
        chai.request(app)
          .post(path)
          .send({
            name: 'John David', email: 'email@yahoo.com', phone: '08164488989', password: 'password', confirmPassword: 'Password',
          })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.status).to.equal('fail');
            expect(res.body.data).to.have.key('confirmPassword');
            done();
          });
      });
    });
  });
});

