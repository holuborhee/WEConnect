
import chai from 'chai';
import models from '../models';


const { expect } = chai;
const {
  Business, Category, User, Review,
} = models;

describe('Database Connection and sesding', () => {
  it('it should connect to databse successfully');

  it('should return businesses of length 10', (done) => {
    Business.findAll()
      .then((businesses) => {
        expect(businesses).to.have.lengthOf(10);
        done();
      });
  });

  it('should return categories of length 6', (done) => {
    Category.findAll()
      .then((categories) => {
        expect(categories).to.have.lengthOf(6);
        done();
      });
  });

  it('should return users of length 10', (done) => {
    User.findAll()
      .then((users) => {
        expect(users).to.have.lengthOf(10);
        done();
      });
  });


  it('should return reviews of length 50', (done) => {
    Review.findAll()
      .then((reviews) => {
        expect(reviews).to.have.lengthOf(50);
        done();
      });
  });
});

