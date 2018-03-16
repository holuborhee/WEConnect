import chai from 'chai';
import Business from '../models/business';


const { expect } = chai;


describe('Model Business', () => {
  describe('function all()', () => {
    it('should return all businesses', (done) => {
      expect(Business.all()).to.be.an('array').that.has.lengthOf(4);
      done();
    });

    it('should return all businesses with name under category at location', (done) => {
      let businesses = Business.nameHas('la');
      businesses = Business.under(4, businesses);
      const owerri = Business.at('owerri', businesses);
      const lagos = Business.at('lagos', businesses);

      expect(owerri).to.be.an('array').that.has.lengthOf(0);
      expect(lagos).to.be.an('array').that.has.lengthOf(1);
      done();
    });
  });

  describe('function at(owerri)', () => {
    it('should return all businesses in owerri', (done) => {
      expect(Business.at('owerri')).to.be.an('array').that.has.lengthOf(3);
      done();
    });
  });

  describe('function under()', () => {
    it('should return all businesses under a category', (done) => {
      expect(Business.under(2)).to.be.an('array').that.has.lengthOf(1);
      done();
    });
  });

  describe('function nameHas(param)', () => {
    it('should return all businesses with param in name', (done) => {
      expect(Business.nameHas('la')).to.be.an('array').that.has.lengthOf(2);
      done();
    });
  });


  describe('Constructor', () => {
    it('constructor should create an instance of business class', (done) => {
      const b = new Business({
        id: 1, name: 'Noble Computers', user: 1, category: 4, latitude: 3.142, longitude: 4.5678, address: '31, Mbaise Road, Owerri',
      });

      expect(b).to.be.an.instanceOf(Business);
      done();
    });

    it('constructor should throw an error if props value are not complete or undefined', (done) => {
      const badfn = () => {
        const b = new Business({
          name: 'Noble Computers', user: 1, category: 4, latitude: 3.142, longitude: 4.5678, address: '31, Mbaise Road, Owerri',
        });

        return b;
      };


      expect(badfn).to.throw();
      done();
    });
  });


  describe('function find()', () => {
    it('find(i) should return a business if value is found for i', (done) => {
      expect(Business.find(2)).to.be.an.instanceOf(Business);
      done();
    });

    it('find(i) should return null if no value is found for i', (done) => {
      expect(Business.find(6)).to.be.null; /* eslint no-unused-expressions: "off" */
      done();
    });
  });


  describe('function modify()', () => {
    it('should return an instance of business', (done) => {
      const b = Business.modify({
        id: 1, name: 'New Name',
      });

      expect(b).to.be.an.instanceOf(Business);
      expect(b.id).to.equal(1);
      expect(b.name).to.equal('New Name');
      expect(b.address).to.equal('31, Mbaise Road, Owerri');
      done();
    });

    it('should still reflect in later call to it', (done) => {
      expect(Business.find(1).name).to.equal('New Name');
      done();
    });

    it('should still return an instance of business', (done) => {
      const b = Business.modify({
        id: 1, nam: 'Noble Computers',
      });

      expect(b).to.be.an.instanceOf(Business);
      expect(b.id).to.equal(1);
      expect(b.name).to.equal('New Name');
      expect(b.address).to.equal('31, Mbaise Road, Owerri');
      done();
    });

    it('should not change businesses array length', (done) => {
      expect(Business.all()).to.have.lengthOf(4);
      done();
    });

    it('should return a null when parameter does not contain id', (done) => {
      const b = Business.modify({
        user: 1, category: 4, latitude: 3.142, longitude: 4.5678, address: '31, Mbaise Road, Owerri',
      });
      expect(b).to.be.null; /* eslint no-unused-expressions: "off" */
      done();
    });
  });

  describe('function create()', () => {
    it('create should return an instance of business', (done) => {
      const b = Business.create({
        name: 'Noble Computers', user: 1, category: 4, latitude: 3.142, longitude: 4.5678, address: '31, Mbaise Road, Owerri',
      });

      expect(b).to.be.an.instanceOf(Business);
      expect(b.id).to.equal(5);
      done();
    });

    it('create should populate businesses array', (done) => {
      expect(Business.all()).to.have.lengthOf(5);
      done();
    });

    it('create should return a null', (done) => {
      const b = Business.create({
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
});
