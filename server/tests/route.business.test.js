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
		  .get(`${BASE_URL}?q=noble`)
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
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(1);
		  	done();
		  });
      });
    });


    describe('POST', () => {
      it('should create a new business, return status of 201 and return data with business detail', (done) => {
    	const business = {
	        id: 1,
	        name: 'Walmart',
	        user: 1,
	        category: 4,
	        latitude: 3.142,
	        longitude: 4.5678,
	        address: 'Agidingbi, Ikeja, Lagos.',
        };
        chai.request(app)
		  .post(BASE_URL)
		  .send(business)
		  .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.data.business.id).to.equal(5);
            done();
          });
      });
      it('should return 422 for when required values are missing', (done) => {
      	const business = {
	        id: 1,
	        name: 'Walmart',
	        latitude: 3.142,
	        longitude: 4.5678,
	        address: 'Agidingbi, Ikeja, Lagos.',
        };
        chai.request(app)
		  .post(BASE_URL)
		  .send(business)
		  .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.status).to.equal('fail');
            expect(res.body.data).to.have.all.keys('user', 'category');
            done();
          });
      });
    });
  });

  describe('/businesses/:id', () => {
  	describe('GET', () => {
  	  it('should return 404 for id not found', (done) => {
  	  	chai.request(app)
  	  	  .get(`${BASE_URL}/8`)
  	  	  .end((err, res) => {
  	  	  	expect(res).to.have.status(404);
  	  	  	expect(res.body.status).to.equal('fail');
  	  	  	expect(res.body.data).to.have.key('id');
  	  	  	done();
  	  	  });
  	  });
  	  it('should return 200 for id present and data of business', (done) => {
  	  	chai.request(app)
  	  	  .get(`${BASE_URL}/1`)
  	  	  .end((err, res) => {
  	  	  	expect(res).to.have.status(200);
  	  	  	expect(res.body.status).to.equal('success');
  	  	  	expect(res.body.data).to.have.key('business');
  	  	  	done();
  	  	  });
  	  });
  	});
  });
});
