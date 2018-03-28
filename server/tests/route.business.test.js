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
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(10);
		  	done();
		  });
      });

      it('should filter fetch all businesses within a location', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?location=lagos`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(2);
		  	done();
		  });
      });

      it('should filter fetch with category', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?category=3`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(5);
		  	done();
		  });
      });

      it.skip('should search for business with name', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?search=andela`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(2);
		  	done();
		  });
      });

      it('should ignore unexpected parameter and return businesses', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?qi=oluaka&locate=owerri&category=4`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(1);
		  	done();
		  });
      });

      it('should search by name and filter by location and category', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}?search=andela&another=nothing&location=lagos&category=3`)
		  .end((err, res) => {
		  	expect(res).to.have.status(200);
		  	expect(res.body.status).to.equal('success');
		  	expect(res.body.data.businesses).to.be.an('array').that.has.lengthOf(1);
		  	done();
		  });
      });
    });


    describe.skip('POST', () => {
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
  	  	  .get(`${BASE_URL}/29`)
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

  	describe.skip('PUT', () => {
  		it('should return fail and 404 if id not found on server', (done) => {
  		  chai.request(app)
  	  	  .put(`${BASE_URL}/9`)
  	  	  .send({ name: 'Another name' })
  	  	  .end((err, res) => {
  	  	  	expect(res).to.have.status(404);
  	  	  	expect(res.body.status).to.equal('fail');
  	  	  	expect(res.body.data).to.have.key('id');
  	  	  	done();
  	  	  });
  		});
  		it('should return success and current data of business', (done) => {
  			chai.request(app)
  			  .put(`${BASE_URL}/1`)
  	  	      .send({ name: 'Another name' })
  	  	      .end((err, res) => {
  	  	  	    expect(res).to.have.status(200);
  	  	  	    expect(res.body.status).to.equal('success');
  	  	  	    expect(res.body.data).to.have.key('business');
  	  	  	    expect(res.body.data.business.id).to.equal(1);
  	  	  	    done();
  	  	      });
  		});

  		it('should ignore id in request body', (done) => {
  			chai.request(app)
  			  .put(`${BASE_URL}/1`)
  	  	      .send({ id: 2, name: 'Manchester Lounge' })
  	  	      .end((err, res) => {
  	  	  	    expect(res).to.have.status(200);
  	  	  	    expect(res.body.status).to.equal('success');
  	  	  	    expect(res.body.data).to.have.key('business');
  	  	  	    expect(res.body.data.business.id).to.equal(1);
  	  	  	    done();
  	  	      });
  		});
  	});


  	describe.skip('DELETE', () => {
  		it('should return fail and 404 if id not found on server', (done) => {
  		  chai.request(app)
  	  	  .delete(`${BASE_URL}/9`)
  	  	  .end((err, res) => {
  	  	  	expect(res).to.have.status(404);
  	  	  	expect(res.body.status).to.equal('fail');
  	  	  	expect(res.body.data).to.have.key('id');
  	  	  	done();
  	  	  });
  		});
  		it('should return success and data of null', (done) => {
  			chai.request(app)
  			  .delete(`${BASE_URL}/1`)
  	  	      .end((err, res) => {
  	  	  	    expect(res).to.have.status(200);
  	  	  	    expect(res.body.status).to.equal('success');
  	  	  	    expect(res.body.data).to.be.null; /* eslint no-unused-expressions: "off" */
  	  	  	    done();
  	  	      });
  		});
  	});
  });
  describe.skip('/businesses/:id/reviews', () => {
  	describe('GET', () => {
  	  it('should return all review for the business', (done) => {
        chai.request(app)
		  .get(`${BASE_URL}/3/reviews`)
		  .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data.reviews).to.be.an('array').that.has.lengthOf(1);
            done();
		  });
  		});
  	  it('should return return fail and status 404 when business id not found', (done) => {
  	  	chai.request(app)
  	  	  .get(`${BASE_URL}/9/reviews`)
  	  	  .end((err, res) => {
  	  	  	expect(res).to.have.status(404);
  	  	  	expect(res.body.status).to.equal('fail');
  	  	  	expect(res.body.data).to.have.key('id');
  	  	  	done();
  	  	  });
  	  });
  	  it('should return success when no review for business', (done) => {
  	  	chai.request(app)
  	  	  .get(`${BASE_URL}/4/reviews`)
  	  	  .end((err, res) => {
  	  	  	expect(res).to.have.status(200);
            expect(res.body.status).to.equal('success');
            expect(res.body.data.reviews).to.be.an('array').that.has.lengthOf(0);
            done();
  	  	  });
  	  });
  	});

  	describe.skip('POST', () => {
  	  it('should return 201 and returned the review created', (done) => {
        chai.request(app)
		  .post(`${BASE_URL}/3/reviews`)
		  .send({ rating: 4.5, comment: 'This is demo review', reviewer: 'Jose Barack' })
		  .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.status).to.equal('success');
            expect(res.body.data).to.be.an('object').that.has.key('review');
            expect(res.body.data.review.id).to.equal(7);
            expect(res.body.data.review.business).to.equal(3);
            done();
		  });
  		});
  	  it('should return return fail and status 404 when business id not found', (done) => {
  	  	chai.request(app)
  	  	  .post(`${BASE_URL}/9/reviews`)
  	  	  .send({ rating: 4.5, comment: 'This is demo review', reviewer: 'Jose Barack' })
  	  	  .end((err, res) => {
  	  	  	expect(res).to.have.status(404);
  	  	  	expect(res.body.status).to.equal('fail');
  	  	  	expect(res.body.data).to.have.key('id');
  	  	  	done();
  	  	  });
  	  });
  	  it('should return fail and status 422, when required field is missing for request', (done) => {
  	  	chai.request(app)
  	  	  .post(`${BASE_URL}/4/reviews`)
  	  	  .send({ comment: 'This is demo review' })
  	  	  .end((err, res) => {
  	  	  	expect(res).to.have.status(422);
            expect(res.body.status).to.equal('fail');
            expect(res.body.data).to.be.an('object').that.has.all.keys('reviewer', 'rating');
            done();
  	  	  });
  	  });
  	});
  });
});
