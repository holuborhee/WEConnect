import db from '../db';
import Helper from '../helpers';
import Review from './review';

const { businesses } = db;

class Business {
  /* IMPORTANT: To implement get avarage Rating function/getter */

  constructor(props) {
    const required = ['id', 'name', 'user', 'category', 'latitude', 'longitude', 'address'];
    if (!props) {
      throw new Error('Undefined Props for Business');
    } else if (Helper.propsNotIn(props, required).length > 0) {
      throw new Error('Some required not found');
    } else {
      this.id = props.id;
      this.name = props.name;
      this.user = props.user;
      this.category = props.category;
      this.latitude = props.latitude;
      this.longitude = props.longitude;
      this.address = props.address;
    }
  }

  get review() {
    return new Review(this.id);
  }

  static add(props) {
    const b = props;
    b.id = businesses.length + 1;
    let newBusiness;
    try {
      newBusiness = new Business(b);
    } catch (err) {
      newBusiness = null;
    }

    newBusiness && businesses.push(newBusiness); /* eslint no-unused-expressions: "off" */
    return newBusiness;
  }

  modify(props) {
    const myB = businesses.find(b => b.id == this.id);

    Object.keys(props).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(myB, key) && key != 'id') { myB[key] = props[key]; }
    });

    return Business.find(myB.id);
  }

  delete() {
    /* eslint array-callback-return: "off" */
    /* eslint consistent-return: "off" */
    businesses.find((b, index, arr) => {
      /* eslint eqeqeq: "off" */
      if (b.id == this.id) {
        arr.splice(index, 1);
        return true; // Once Item is deleted break out of the search
      }
    });
    return true;
  }

  static find(id) {
    const i = parseInt(id, 10);
    const business = businesses.find(b => b.id === i);
    return (business && new Business(business)) || null;
  }

  static all() {
  	return businesses;
  }

  static at(location, myBusinesses = businesses) {
    return myBusinesses.filter(b => b.address.toLowerCase().includes(location.toLowerCase()));
  }

  static nameHas(query, myBusinesses = businesses) {
    return myBusinesses.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));
  }

  static under(cat, myBusinesses = businesses) {
    const category = parseInt(cat, 10);
    return myBusinesses.filter(b => b.category === category);
  }
}

export default Business;
