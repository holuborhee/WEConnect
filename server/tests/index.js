import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);


describe('Routes', () => {
  describe('/user - user path without parameter', () => {
    it('/GET should be successfull', (done) => {
      chai.request(app)
		  .get('/api/v1/user')
		  .end((err, res) => {
		  	expect(res.body.message).to.equal('Implement function to get all users here');
		  	expect(res).to.have.status(200);
		  	done();
		  });
    });

    // Test for Post user shiuld be here
  });
});

