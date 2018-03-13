import chai from 'chai';
import User from '../models/user';


const { expect } = chai;


describe('Model User', () => {
  describe('function find()', () => {
    it('should return an object when id matches an existing id', (done) => {
      expect(User.find(1)).to.be.an('object');
      done();
    });

    it('should return null when id can not be found', (done) => {
      expect(User.find(7)).to.be.undefined; /* eslint no-unused-expressions: "off" */
      done();
    });
  });

  describe('function add()', () => {
  	it('should populate the users db', (done) => {
  		User.add({
        name: 'Adekunle Ajasin', phone: '08052356173', email: 'rosaline@gmail.com', password: 'password',
      });
      expect(User.all()).to.be.length(6);
      done();
    });

    it('should return an object', (done) => {
  	 const user = User.add({
        name: 'Adekunle Ajasin', phone: '08052356173', email: 'rosaline@gmail.com', password: 'password',
      });
      expect(user).to.be.an('object');
      done();
    });

    it('should perform no action and return null when parameters are not complete', (done) => {
      const user = User.add({
        phone: '08052356173', email: 'rosaline@gmail.com', password: 'password',
      });
      expect(user).to.be.null;
      expect(User.all()).to.be.length(7);
      done();
    });
  });


  // You can include test on other functions in user class here
});
