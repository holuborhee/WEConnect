import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);
const BASE_URL = '/api/v1/businesses';

describe('Business Routes', () => {
  describe('/businesses', () => {
    describe('GET', () => {
      it('should fetch all businesses when no parameter is present', (done) => {
        chai.request(app)
		  .get(BASE_URL)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(4);
		  	done();
		  });
      });

      it('should filter fetch all businesses within a location', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?location=owerri`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(3);
		  	done();
		  });
      });

      it('should filter fetch with category', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?category=2`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(1);
		  	done();
		  });
      });

      it('should search for business with name', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?q=oluaka`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(1);
		  	done();
		  });
      });

      it('should ignore unexpected parameter and return businesses', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?qi=oluaka&locate=owerri&category=4`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(3);
		  	done();
		  });
      });

      it('should search by name and filter by location and category', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?q=a&another=nothing&location=owerri&category=4`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(3);
		  	done();
		  });
      });
    });
  });
});
