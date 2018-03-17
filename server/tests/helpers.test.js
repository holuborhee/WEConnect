import chai from 'chai';
import Helper from '../helpers';

const { expect } = chai;

describe('Helper Tst', () => {
  it('it should check for required propertiess', (done) => {
    const ob = { id: 1, name: 2, age: '' };
    expect(Helper.propsNotIn(ob, ['name', 'age'])).to.eql(['age']);
    done();
  });
});


describe('Validate Required In Request', () => {
  it('it should return true', (done) => {
    const requestObj = {
      name: 'John Stones', age: '20', year: '1998', gender: '',
    };
    const requiredArr = ['name', 'age', 'year'];
    /* eslint no-unused-expressions: "off" */
  	expect(Helper.validateRequiredInRequest(requestObj, requiredArr)).to.be.true;
  	done();
  });
  it('it should return required not found', (done) => {
  	const requestObj = {
      name: 'John Stones', age: '', gender: '',
    };
    const requiredArr = ['name', 'age', 'year'];
    const resp = Helper.validateRequiredInRequest(requestObj, requiredArr);
  	expect(resp.data).to.be.an('object').that.has.all.keys('age', 'year');
  	expect(resp.status).to.equal('fail');
  	done();
  });
});

