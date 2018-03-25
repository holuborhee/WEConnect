import chai from 'chai';
import User from '../models/User';


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


  describe('function getByEmail()', () => {
    it('should return an object', (done) => {
      expect(User.getByEmail('daveholuborhee@gmail.com')).to.be.an('object');
      done();
    });

    it('should return undefined', (done) => {
      expect(User.getByEmail('daveho@gmail.com')).to.be.undefined; /* eslint no-unused-expressions: "off" */
      expect(User.getByEmail('08164488989')).to.be.undefined; /* eslint no-unused-expressions: "off" */
      done();
    });
  });

  describe('function getByPhone()', () => {
    it('should return an object', (done) => {
      const user = User.getByPhone('08164488989');
      expect(user).to.be.an('object').that.has.property('phone');
      expect(user).to.be.an('object').that.has.property('password');
      done();
    });

    it('should return undefined', (done) => {
      expect(User.getByPhone('daveholuborhee@gmail.com')).to.be.undefined; /* eslint no-unused-expressions: "off" */
      expect(User.getByPhone('0705139344333')).to.be.undefined; /* eslint no-unused-expressions: "off" */
      done();
    });
  });


  describe('function getByPhoneAndPassword()', () => {
    it('should return an object', (done) => {
      const user = User.getByPhoneAndPassword('08164488989', 'password');
      expect(user).to.be.an('object').that.has.property('phone');
      expect(user).to.be.an('object').that.has.property('email');
      expect(user).to.be.an('object').that.has.property('password');
      expect(user.password).to.equal('password');
      done();
    });

    it('should return field not matching as key', (done) => {
      expect(User.getByPhoneAndPassword('08164488989', 'ssword')).to.have.key('password');
      expect(User.getByPhoneAndPassword('0816448', 'password')).to.have.key('phone');
      expect(User.getByPhoneAndPassword('0816448', 'sword')).to.have.key('phone');
      done();
    });
  });


  describe('function getByEmailAndPassword()', () => {
    it('should return an object', (done) => {
      expect(User.getByEmailAndPassword('daveholuborhee@gmail.com', 'password')).to.be.an('object');
      done();
    });

    it('should return field not matching as key', (done) => {
      expect(User.getByEmailAndPassword('daveholuborhee@gmail.com', 'ssword')).to.have.key('password');
      expect(User.getByEmailAndPassword('davehe@gmail.com', 'password')).to.have.key('email');
      expect(User.getByEmailAndPassword('0816448', 'sword')).to.have.key('email');
      done();
    });
  });

  describe('function add()', () => {
  	it('should populate the users db', (done) => {
  		User.add({
        name: 'Adekunle Ajasin', phone: '08052356173', email: 'rosaline@gmail.com', password: 'password',
      });
      expect(User.all()).to.be.length(5);
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
      expect(User.all()).to.be.length(6);
      done();
    });
  });


  // You can include test on other functions in user class here
});
