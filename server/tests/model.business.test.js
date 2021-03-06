import chai from 'chai';
import models from '../models';


const { expect } = chai;

const { Business, Review } = models;


describe('Model Business', () => {
  describe('READ', () => {
    it('should return all businesses', (done) => {
      Business.findAll()
        .then((business) => {
          expect(business).to.be.an('Array').and.have.lengthOf(10);
          done();
        });
    });
    it('should return all businesses with name under category at location');

    describe('function at(owerri)', () => {
      it('should return all businesses in owerri');
    });

    describe('function under()', () => {
      it('should return all businesses under a category');
    });

    describe('function nameHas(param)', () => {
      it('should return all businesses with param in name');
    });


    describe('findByID', () => {
      it('should return a business if ID is found', (done) => {
        Business.findById(2)
          .then((business) => {
            expect(business).to.be.an.instanceOf(Business);
            done();
          });
      });

      it('should return null if id is not found', (done) => {
        Business.findById(23)
          .then((business) => {
            expect(business).to.be.null;
            done();
          });
      });
    });

    describe('get Review', () => {
      it('should return all reviews for a business', (done) => {
        Business.findById(2)
          .then((business) => {
            Review.findAll({ where: { businessId: business.id } })
              .then((reviews) => {
                expect(reviews).to.be.an('Array').that.has.lengthOf(5);
                done();
              });
          });
      });
    });
  });

  describe.skip('DELETE', () => {
    it('should reduce the businesses table', (done) => {
      Business.findById(4)
        .then((business) => {
          business.destroy()
            .then((business) => {
              Business.findAll()
                .then((businesses) => {
                  expect(businesses).to.be.an('Array').and.to.have.lengthOf(9);
                  done();
                });
            });
        });
    });

    it('should remove the instance', (done) => {
      Business.findById(4)
        .then((business) => {
          expect(business).to.be.null;
          done();
        });
    });
    it('should delete all reviews connected to it', () => {
      Review.findAll({ where: { businessId: 4 } })
        .then((review) => {
          expect(review).to.be.lengthOf(0);
          done();
        });
    });
  });
});
describe.skip('Model Business', () => {
  describe('function modify()', () => {
    it('should return an instance of business');

    it('should still reflect in later call to it');

    it('should still return an instance of business');

    it('should not change businesses array length', (done) => {
      expect(Business.all()).to.have.lengthOf(4);
      done();
    });

    it('should ignore id in parameter', (done) => {
      b = b.modify({
        id: 5, name: 'Another Name',
      });

      expect(b).to.be.an.instanceOf(Business);
      expect(b.id).to.equal(1);
      expect(b.name).to.equal('Another Name');
      expect(b.address).to.equal('31, Mbaise Road, Owerri');
      done();
    });
  });

  describe('function add()', () => {
    it('add should return an instance of business', (done) => {
      const b = Business.add({
        name: 'Noble Computers', user: 1, category: 4, latitude: 3.142, longitude: 4.5678, address: '31, Mbaise Road, Owerri',
      });

      expect(b).to.be.an.instanceOf(Business);
      expect(b.id).to.equal(5);
      done();
    });

    it('add should populate businesses array', (done) => {
      expect(Business.all()).to.have.lengthOf(5);
      done();
    });

    it('add should return a null', (done) => {
      const b = Business.add({
        user: 1, category: 4, latitude: 3.142, longitude: 4.5678, address: '31, Mbaise Road, Owerri',
      });


      expect(b).to.be.null; /* eslint no-unused-expressions: "off" */
      done();
    });
  });


  describe('function delete()', () => {
    it('should return true after delete', (done) => {
      const b = Business.find(2);
      expect(b.delete()).to.be.true;
      done();
    });

    it('should reduce the length of array', (done) => {
      expect(Business.all()).to.have.lengthOf(4);
      done();
    });

    it('should return null for find() call on the id', (done) => {
      expect(Business.find(2)).to.be.null;
      done();
    });
  });


  describe('get Review', () => {
    describe('function all()', () => {
      it('should return all reviews for a business', (done) => {
        const business = Business.find(1);
        expect(business.review.all()).to.have.lengthOf(3);
        done();
      });
    });

    describe('function add()', () => {
      it('should add to the review for a business', (done) => {
        const business = Business.find(1);
        const review = { comment: 'My comment', rating: 4.5, reviewer: 'Hohn adav' };
        business.review.add(review);
        expect(business.review.all()).to.have.lengthOf(4);
        done();
      });
    });
  });

  describe('get AverageRating', () => {
    it('should calculate and return avarage rating for a business');
  });
});
