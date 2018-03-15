import chai from 'chai';
import Helper from '../helpers';

const { expect } = chai;

describe('Helper Tst', () => {
  it('it should check for required propertiess', (done) => {
    const ob = { id: 1, name: 2 };
    expect(Helper.propsNotIn(ob, ['name', 'age'])).to.eql(['age']);
    done();
  });
});


describe('Validate Required In Request', () => {
  it('it should return true');
  it('it should return reuired not found');
});

